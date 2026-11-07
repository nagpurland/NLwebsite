// Mock Component for Casual Browser Conversion
// Trigger: User browsed 3+ properties WITHOUT filters OR spent 2+ minutes
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { tracker } from '@/lib/tracking';
import { Sparkles } from 'lucide-react';

export function CasualBrowserModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState({ whatsapp: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    tracker.track('form_view', { event_data: { form_type: 'casual_browser' } });
    console.log('Capturing casual browser lead:', formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Don't Miss the Best Deals</DialogTitle>
          <DialogDescription className="text-center">
            70% of the best properties in Nagpur are sold before they're even listed online. Get early access to "off-market" deals.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2 text-left">
            <Label htmlFor="cb-whatsapp">WhatsApp Number</Label>
            <Input 
              id="cb-whatsapp" 
              required 
              type="tel" 
              placeholder="+91 98765..."
              value={formData.whatsapp}
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold h-12">
            Unlock Hidden Deals
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
