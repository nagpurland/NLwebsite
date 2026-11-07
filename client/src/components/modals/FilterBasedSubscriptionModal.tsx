// Mock Component for Filter Based Subscription
// Trigger: Show after user views 3 filtered properties
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { tracker } from '@/lib/tracking';

export function FilterBasedSubscriptionModal({ 
  open, 
  onOpenChange,
  filters = { area: 'Besa', budget: '40-60L' } 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  filters?: any;
}) {
  const [formData, setFormData] = useState({ name: '', whatsapp: '', remarks: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    tracker.track('form_view', { event_data: { form_type: 'filter_subscription' } });
    // Simulate API call
    console.log('Subscribing user with filters:', filters, formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Stay Updated on Properties You Like ✨</DialogTitle>
          <DialogDescription>
            We'll notify you on WhatsApp when properties matching your preferences become available.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm mb-4">
          <div className="font-semibold text-muted-foreground mb-2">Your Preferences (Auto-filled):</div>
          <div className="flex items-center gap-2">
            <Checkbox checked disabled /> <span>Area: {filters.area}</span>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked disabled /> <span>Budget: {filters.budget}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              required 
              placeholder="Your Name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input 
              id="whatsapp" 
              required 
              type="tel" 
              placeholder="+91 98765..."
              value={formData.whatsapp}
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="remarks">Additional requirements (optional)</Label>
            <Input 
              id="remarks" 
              placeholder="e.g. Near Metro station"
              value={formData.remarks}
              onChange={e => setFormData({...formData, remarks: e.target.value})}
            />
          </div>
          
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="ghost" type="button" onClick={() => onOpenChange(false)}>Maybe Later</Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">Get WhatsApp Updates</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
