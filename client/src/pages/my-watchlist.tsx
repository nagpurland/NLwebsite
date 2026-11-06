import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Bookmark, 
  Bell, 
  Trash2, 
  MapPin, 
  TrendingUp,
  Mail,
  Settings2,
  AlertCircle
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { PriceAlertModal } from "@/components/widgets/PriceAlertModal";

interface WatchlistItem {
  id: number;
  sessionId: string;
  localityName: string;
  localityId?: number;
  email?: string;
  notifyPriceChanges: boolean;
  notifyNewListings: boolean;
  notifyInfraUpdates: boolean;
  weeklyDigest: boolean;
  createdAt: string;
}

interface PriceAlert {
  id: number;
  localityName: string;
  alertType: string;
  condition: string;
  thresholdValue?: number;
  thresholdUnit?: string;
  isTriggered: boolean;
  isActive: boolean;
  createdAt: string;
}

function getSessionId(): string {
  let sessionId = localStorage.getItem("buyer_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("buyer_session_id", sessionId);
  }
  return sessionId;
}

export default function MyWatchlist() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  const { data: watchlist, isLoading: watchlistLoading } = useQuery<WatchlistItem[]>({
    queryKey: ['/api/watchlist'],
    queryFn: async () => {
      const res = await fetch('/api/watchlist', {
        headers: { 'x-session-id': sessionId }
      });
      if (!res.ok) throw new Error('Failed to fetch watchlist');
      return res.json();
    }
  });

  const { data: alerts, isLoading: alertsLoading } = useQuery<PriceAlert[]>({
    queryKey: ['/api/alerts'],
    queryFn: async () => {
      const res = await fetch('/api/alerts', {
        headers: { 'x-session-id': sessionId }
      });
      if (!res.ok) throw new Error('Failed to fetch alerts');
      return res.json();
    }
  });

  const updateWatchlistMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<WatchlistItem> }) => {
      const res = await fetch(`/api/watchlist/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/watchlist'] });
      toast({ title: "Settings updated" });
    }
  });

  const removeWatchlistMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/watchlist/${id}`, {
        method: 'DELETE',
        headers: { 'x-session-id': sessionId }
      });
      if (!res.ok) throw new Error('Failed to remove');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/watchlist'] });
      toast({ title: "Removed from watchlist" });
    }
  });

  const deleteAlertMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/alerts/${id}`, {
        method: 'DELETE',
        headers: { 'x-session-id': sessionId }
      });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
      toast({ title: "Alert deleted" });
    }
  });

  const formatAlertCondition = (alert: PriceAlert) => {
    if (alert.alertType === 'price_below') {
      return `Price drops below ₹${alert.thresholdValue}/sqft`;
    }
    if (alert.alertType === 'price_above') {
      return `Price rises above ₹${alert.thresholdValue}/sqft`;
    }
    if (alert.alertType === 'litigation_below') {
      return `Litigation cases drop below ${alert.thresholdValue}%`;
    }
    return 'New infrastructure announced';
  };

  return (
    <PublicLayout>
      <div className="pt-32 pb-24 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Bookmark className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">My Watchlist</h1>
                <p className="text-slate-500 dark:text-slate-400">Track localities and get notified about price changes</p>
              </div>
            </div>

            <div className="grid gap-8">
              <Card className="border-none shadow-xl rounded-2xl" data-testid="card-watchlist-localities">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                    Watched Localities
                  </CardTitle>
                  <CardDescription>
                    Localities you're tracking for price movements and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {watchlistLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-24 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : !watchlist?.length ? (
                    <div className="text-center py-12 text-slate-500">
                      <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p className="font-medium">No localities in your watchlist</p>
                      <p className="text-sm">Add localities to track their price movements</p>
                      <Link href="/localities">
                        <Button className="mt-4" data-testid="link-browse-localities">
                          Browse Localities
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {watchlist.map(item => (
                        <div 
                          key={item.id} 
                          className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-4"
                          data-testid={`watchlist-item-${item.id}`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <Link href={`/locality/${item.localityName.toLowerCase()}`}>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white hover:text-indigo-600 transition-colors cursor-pointer">
                                  {item.localityName}
                                </h3>
                              </Link>
                              <p className="text-sm text-slate-500">
                                Added {new Date(item.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeWatchlistMutation.mutate(item.id)}
                              className="text-slate-400 hover:text-red-600"
                              data-testid={`button-remove-${item.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-between gap-2">
                              <Label className="text-xs text-slate-500">Price Changes</Label>
                              <Switch
                                checked={item.notifyPriceChanges}
                                onCheckedChange={(checked) => 
                                  updateWatchlistMutation.mutate({ id: item.id, data: { notifyPriceChanges: checked } })
                                }
                                data-testid={`switch-price-${item.id}`}
                              />
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <Label className="text-xs text-slate-500">New Listings</Label>
                              <Switch
                                checked={item.notifyNewListings}
                                onCheckedChange={(checked) => 
                                  updateWatchlistMutation.mutate({ id: item.id, data: { notifyNewListings: checked } })
                                }
                                data-testid={`switch-listings-${item.id}`}
                              />
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <Label className="text-xs text-slate-500">Infra Updates</Label>
                              <Switch
                                checked={item.notifyInfraUpdates}
                                onCheckedChange={(checked) => 
                                  updateWatchlistMutation.mutate({ id: item.id, data: { notifyInfraUpdates: checked } })
                                }
                                data-testid={`switch-infra-${item.id}`}
                              />
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <Label className="text-xs text-slate-500">Weekly Digest</Label>
                              <Switch
                                checked={item.weeklyDigest}
                                onCheckedChange={(checked) => 
                                  updateWatchlistMutation.mutate({ id: item.id, data: { weeklyDigest: checked } })
                                }
                                data-testid={`switch-digest-${item.id}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-2xl" data-testid="card-price-alerts">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-amber-500" />
                    Price Alerts
                  </CardTitle>
                  <CardDescription>
                    Custom alerts for specific price conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {alertsLoading ? (
                    <div className="space-y-4">
                      {[1, 2].map(i => (
                        <Skeleton key={i} className="h-16 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : !alerts?.length ? (
                    <div className="text-center py-12 text-slate-500">
                      <Bell className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p className="font-medium">No price alerts set</p>
                      <p className="text-sm">Create alerts to get notified about price changes</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {alerts.map(alert => (
                        <div 
                          key={alert.id}
                          className={`flex items-center justify-between p-4 rounded-xl ${
                            alert.isTriggered 
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' 
                              : 'bg-slate-50 dark:bg-slate-800'
                          }`}
                          data-testid={`alert-item-${alert.id}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                              alert.isTriggered ? 'bg-emerald-100 dark:bg-emerald-800' : 'bg-slate-200 dark:bg-slate-700'
                            }`}>
                              {alert.isTriggered ? (
                                <AlertCircle className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <Bell className="h-4 w-4 text-slate-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white">
                                {alert.localityName}
                              </p>
                              <p className="text-sm text-slate-500">
                                {formatAlertCondition(alert)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {alert.isTriggered && (
                              <Badge className="bg-emerald-500">Triggered</Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteAlertMutation.mutate(alert.id)}
                              className="text-slate-400 hover:text-red-600"
                              data-testid={`button-delete-alert-${alert.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Mail className="h-10 w-10 opacity-80" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">Weekly Price Digest</h3>
                      <p className="text-white/80 text-sm">
                        Get a weekly email with price movements in your watchlist
                      </p>
                    </div>
                    <Badge className="bg-white/20 text-white border-none">Coming Soon</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
