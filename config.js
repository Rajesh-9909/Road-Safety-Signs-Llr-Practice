import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase configuration
const supabaseUrl = 'https://ittpqmsjywssnffqoonv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dHBxbXNqeXdzc25mZnFvb252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzY3NjksImV4cCI6MjA2NTY1Mjc2OX0.UdnbCkWY2j3JcPSZhEuLJz0-eXX1HQ_daZmTI62zRFU';
// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);


