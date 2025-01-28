/*
  # Create requests table for maintenance system

  1. New Tables
    - `requests`
      - `id` (uuid, primary key)
      - `type` (text) - Type of maintenance request
      - `department` (text) - Requesting department
      - `title` (text) - Request title
      - `description` (text) - Detailed description
      - `status` (text) - Current status (pending/in-progress/completed)
      - `created_at` (timestamptz) - Creation timestamp
      - `start_date` (timestamptz) - Work start date
      - `end_date` (timestamptz) - Work completion date
      - `execution_time` (integer) - Time taken in minutes
      - `photos` (text[]) - Array of photo URLs
      - `technician_notes` (text) - Notes from maintenance staff
      - `user_id` (uuid) - Reference to auth.users

  2. Security
    - Enable RLS on requests table
    - Add policies for authenticated users to:
      - Create their own requests
      - Read their own requests
      - Update their own requests
*/

-- Create the requests table
CREATE TABLE IF NOT EXISTS requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  department text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  start_date timestamptz,
  end_date timestamptz,
  execution_time integer,
  photos text[],
  technician_notes text,
  user_id uuid REFERENCES auth.users(id),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'in-progress', 'completed')),
  CONSTRAINT valid_type CHECK (type IN ('maintenance', 'repair', 'installation'))
);

-- Enable Row Level Security
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own requests"
  ON requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own requests"
  ON requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests"
  ON requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow public read access temporarily for development
CREATE POLICY "Allow public read access"
  ON requests
  FOR SELECT
  TO anon
  USING (true);

-- Allow public write access temporarily for development
CREATE POLICY "Allow public write access"
  ON requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON requests
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);