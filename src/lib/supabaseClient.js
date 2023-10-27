import { createClient } from "@supabase/supabase-js";

export const supabase = createClient('https://ogbgfvnmaqjspoehxpzi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYmdmdm5tYXFqc3BvZWh4cHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0MDIwNjMsImV4cCI6MjAxMzk3ODA2M30.iQ4qZS7YMxUBDDrW0PJzop-oeiSx-Pzo-5g7GUZRuKQ', {
    db: {
        schema: 'chorussoranus'
    }
})