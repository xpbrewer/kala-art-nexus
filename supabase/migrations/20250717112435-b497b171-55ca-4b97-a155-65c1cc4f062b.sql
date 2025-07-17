-- Create art_forms table
CREATE TABLE public.art_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  origin TEXT NOT NULL,
  type TEXT NOT NULL,
  image_url_1 TEXT NOT NULL,
  image_url_2 TEXT,
  image_url_3 TEXT,
  likes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.art_forms ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Art forms are viewable by everyone" 
ON public.art_forms 
FOR SELECT 
USING (true);

CREATE POLICY "Art forms can be inserted by anyone" 
ON public.art_forms 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Art forms can be updated by anyone" 
ON public.art_forms 
FOR UPDATE 
USING (true);

CREATE POLICY "Art forms can be deleted by anyone" 
ON public.art_forms 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_art_forms_updated_at
BEFORE UPDATE ON public.art_forms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.art_forms (title, description, origin, type, image_url_1, likes) VALUES
('Warli Folk Art', 'Traditional tribal art from Maharashtra featuring simple figures, animals, and nature motifs painted in white on mud walls', 'Maharashtra', 'Painting', '/src/assets/art-warli.jpg', 124),
('Kathakali', 'Classical dance-drama from Kerala with elaborate costumes, intricate face painting, and expressive storytelling', 'Kerala', 'Dance', '/src/assets/art-kathakali.jpg', 89),
('Rajasthani Miniature Painting', 'Intricate paintings depicting royal court life, mythology, and nature with fine brushwork and vibrant colors', 'Rajasthan', 'Painting', '/src/assets/art-miniature.jpg', 156);