import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface PriceAlertModalProps {
  localityName: string;
  currentPrice?: number;
  children?: React.ReactNode;
}

function getSessionId(): string {
  let sessionId = localStorage.getItem("buyer_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("buyer_session_id", sessionId);
  }
  return sessionId;
}

const ALERT_TYPES = [
  { value: 'price_below', label: 'Price drops below', unit: 'per_sqft' },
  { value: 'price_above', label: 'Price rises above', unit: 'per_sqft' },
  { value: 'litigation_below', label: 'Litigation cases drop below', unit: 'percentage' },
  { value: 'new_infra', label: 'New infrastructure announced', unit: 'count' }
];

export function PriceAlertModal({ localityName, currentPrice, children }: PriceAlertModalProps) {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('price_below');
  const [thresholdValue, setThresholdValue] = useState(currentPrice ? String(currentPrice - 200) : '3500');
  const [email, setEmail] = useState('');
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  const selectedType = ALERT_TYPES.find(t => t.value === alertType);

  const createMutation = useMutation({
    mutationFn: async () => {
      const condition = alertType === 'price_below' 
        ? `price < ${thresholdValue}`
        : alertType === 'price_above'
        ? `price > ${thresholdValue}`
        : alertType === 'litigation_below'
        ? `litigation_cases < ${thresholdValue}%`
        : 'new_infra_announced';

      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId
        },
        body: JSON.stringify({
          localityName,
          alertType,
          condition,
          thresholdValue: parseInt(thresholdValue),
          thresholdUnit: selectedType?.unit,
          email: email || undefined
        })
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create alert');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
      toast({
        title: "Alert Created",
        description: `You'll be notified when the condition is met for ${localityName}.`
      });
      setOpen(false);
      setAlertType('price_below');
      setThresholdValue(currentPrice ? String(currentPrice - 200) : '3500');
      setEmail('');
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate();
  };

  const getUnitLabel = () => {
    if (alertType === 'price_below' || alertType === 'price_above') return '/sqft';
    if (alertType === 'litigation_below') return '%';
    return '';
  };

  const getPlaceholder = () => {
    if (alertType === 'price_below' || alertType === 'price_above') return 'e.g., 3800';
    if (alertType === 'litigation_below') return 'e.g., 10';
    return '';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" data-testid="button-create-alert">
            <Bell className="h-4 w-4 mr-2" />
            Set Price Alert
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-testid="modal-price-alert">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-indigo-600" />
            Create Price Alert
          </DialogTitle>
          <DialogDescription>
            Get notified when your conditions are met for {localityName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="alert-type">Alert Type</Label>
            <Select value={alertType} onValueChange={setAlertType}>
              <SelectTrigger id="alert-type" data-testid="select-alert-type">
                <SelectValue placeholder="Select alert type" />
              </SelectTrigger>
              <SelectContent>
                {ALERT_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {alertType !== 'new_infra' && (
            <div className="space-y-2">
              <Label htmlFor="threshold">
                {alertType === 'price_below' ? 'Notify when price drops below' :
                 alertType === 'price_above' ? 'Notify when price rises above' :
                 'Notify when cases drop below'}
              </Label>
              <div className="flex items-center gap-2">
                {(alertType === 'price_below' || alertType === 'price_above') && (
                  <span className="text-muted-foreground">₹</span>
                )}
                <Input
                  id="threshold"
                  type="number"
                  value={thresholdValue}
                  onChange={(e) => setThresholdValue(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="flex-1"
                  data-testid="input-threshold"
                />
                <span className="text-muted-foreground text-sm">{getUnitLabel()}</span>
              </div>
              {currentPrice && (alertType === 'price_below' || alertType === 'price_above') && (
                <p className="text-xs text-muted-foreground">
                  Current price: ₹{currentPrice}/sqft
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              data-testid="input-email"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to only see alerts in the app
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-alert">
              {createMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Alert'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
