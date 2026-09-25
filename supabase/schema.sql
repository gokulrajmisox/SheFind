-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE,
    education_level TEXT,
    state TEXT,
    district TEXT,
    interests TEXT[],
    income_range TEXT,
    age INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    active BOOLEAN DEFAULT TRUE
);

-- Table: opportunities
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    organization TEXT NOT NULL,
    description TEXT,
    type TEXT,
    category UUID REFERENCES categories(id) ON DELETE SET NULL,
    education_level TEXT[],
    state TEXT[],
    district TEXT[],
    gender_eligibility TEXT DEFAULT 'female',
    min_age INTEGER,
    max_age INTEGER,
    income_limit NUMERIC,
    benefits TEXT,
    eligibility_text TEXT,
    documents_required TEXT[],
    application_start_date DATE,
    application_deadline DATE,
    official_application_url TEXT NOT NULL,
    official_source_url TEXT NOT NULL,
    status TEXT DEFAULT 'draft', -- draft, active, inactive
    verification_status TEXT DEFAULT 'pending', -- pending, verified, rejected
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: opportunity_categories
CREATE TABLE opportunity_categories (
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (opportunity_id, category_id)
);

-- Table: saved_opportunities
CREATE TABLE saved_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, opportunity_id)
);

-- Table: reminders
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    reminder_date DATE NOT NULL,
    reminder_type TEXT,
    is_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: admin_users
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('admin', 'editor', 'verifier')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: verification_logs
CREATE TABLE verification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Opportunities
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active and verified opportunities" ON opportunities FOR SELECT USING (status = 'active' AND verification_status = 'verified');
CREATE POLICY "Admins can do everything on opportunities" ON opportunities TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
);

-- Saved Opportunities
ALTER TABLE saved_opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own saved opportunities" ON saved_opportunities FOR ALL USING (auth.uid() = user_id);

-- Reminders
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own reminders" ON reminders FOR ALL USING (auth.uid() = user_id);

-- Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND role = 'admin')
);

-- Admin Users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read admin_users" ON admin_users FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND role = 'admin')
);

-- Verification Logs
ALTER TABLE verification_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read verification logs" ON verification_logs FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
);
