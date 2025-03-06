-- Kreiranje tablice za zadatke
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('direct', 'investment')),
  duration NUMERIC NOT NULL,
  cost NUMERIC NOT NULL DEFAULT 0,
  current_revenue NUMERIC NOT NULL DEFAULT 0,
  potential_revenue NUMERIC NOT NULL DEFAULT 0,
  completion_date DATE NOT NULL,
  revenue_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dodavanje indeksa za brže upite
CREATE INDEX tasks_user_id_idx ON tasks(user_id);
CREATE INDEX tasks_category_idx ON tasks(category);
CREATE INDEX tasks_completion_date_idx ON tasks(completion_date);

-- Funkcija za automatsko ažuriranje updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger za automatsko ažuriranje updated_at
CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Postavljanje RLS (Row Level Security) politika
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Politika za čitanje - korisnici mogu vidjeti samo svoje zadatke
CREATE POLICY "Users can view their own tasks"
  ON tasks
  FOR SELECT
  USING (auth.uid() = user_id);

-- Politika za umetanje - korisnici mogu dodati zadatke samo sebi
CREATE POLICY "Users can insert their own tasks"
  ON tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Politika za ažuriranje - korisnici mogu ažurirati samo svoje zadatke
CREATE POLICY "Users can update their own tasks"
  ON tasks
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Politika za brisanje - korisnici mogu brisati samo svoje zadatke
CREATE POLICY "Users can delete their own tasks"
  ON tasks
  FOR DELETE
  USING (auth.uid() = user_id);