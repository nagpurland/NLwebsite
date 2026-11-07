// Mock Component for Exit Intent Capture
// Trigger: Mouse leaves viewport
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { tracker } from '@/lib/tracking';
import { BookOpen } from 'lucide-react';

export function ExitIntentModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState({ email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    tracker.track('form_view', { event_data: { form_type: 'exit_intent' } });
    console.log('Capturing exit intent lead:', formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-primary text-white border-slate-800">
        <div className="flex gap-6 items-start">
          <div className="bg-slate-800 p-4 rounded-xl hidden sm:block">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Wait! Before you go...</DialogTitle>
              <DialogDescription className="text-slate-400">
                Get our free <strong>"Nagpur 2026 Investor Guide"</strong>. It covers the Metro Phase 2 impact, best rental pockets, and legal checklists.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Input 
                  id="ei-email" 
                  required 
                  type="email" 
                  placeholder="Enter your email address"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold h-12">
                Send Me the Guide
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
