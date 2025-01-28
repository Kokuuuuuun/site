/*
  # Schema inicial para sistema de solicitudes

  1. Nuevas Tablas
    - `requests`
      - `id` (uuid, primary key)
      - `type` (text) - Tipo de solicitud
      - `priority` (text) - Prioridad de la solicitud
      - `department` (text) - Departamento
      - `title` (text) - Título de la solicitud
      - `description` (text) - Descripción detallada
      - `status` (text) - Estado de la solicitud
      - `created_at` (timestamptz) - Fecha de creación
      - `start_date` (timestamptz) - Fecha de inicio
      - `end_date` (timestamptz) - Fecha de finalización
      - `execution_time` (integer) - Tiempo de ejecución en horas
      - `user_id` (uuid) - ID del usuario que creó la solicitud

  2. Seguridad
    - Habilitar RLS en la tabla requests
    - Políticas para lectura y escritura de solicitudes
*/

-- Crear tabla de solicitudes
CREATE TABLE requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  priority text NOT NULL,
  department text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  start_date timestamptz,
  end_date timestamptz,
  execution_time integer,
  user_id uuid REFERENCES auth.users(id),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'in-progress', 'completed')),
  CONSTRAINT valid_priority CHECK (priority IN ('high', 'medium', 'low')),
  CONSTRAINT valid_type CHECK (type IN ('maintenance', 'repair', 'installation'))
);

-- Habilitar Row Level Security
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
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