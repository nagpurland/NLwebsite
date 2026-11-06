import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface WatchlistButtonProps {
  localityName: string;
  localityId?: number;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

function getSessionId(): string {
  let sessionId = localStorage.getItem("buyer_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("buyer_session_id", sessionId);
  }
  return sessionId;
}

export function WatchlistButton({ 
  localityName, 
  localityId, 
  variant = "outline", 
  size = "default",
  className 
}: WatchlistButtonProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  const { data: checkData, isLoading: checkLoading } = useQuery({
    queryKey: ['/api/watchlist/check', localityName],
    queryFn: async () => {
      const res = await fetch(`/api/watchlist/check/${encodeURIComponent(localityName)}`, {
        headers: { 'x-session-id': sessionId }
      });
      if (!res.ok) throw new Error('Failed to check watchlist');
      return res.json();
    }
  });

  const inWatchlist = checkData?.inWatchlist ?? false;

  const { data: watchlist } = useQuery({
    queryKey: ['/api/watchlist'],
    queryFn: async () => {
      const res = await fetch('/api/watchlist', {
        headers: { 'x-session-id': sessionId }
      });
      if (!res.ok) throw new Error('Failed to fetch watchlist');
      return res.json();
    },
    enabled: inWatchlist
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId
        },
        body: JSON.stringify({ localityName, localityId })
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to add to watchlist');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/watchlist'] });
      queryClient.invalidateQueries({ queryKey: ['/api/watchlist/check', localityName] });
      toast({
        title: "Added to Watchlist",
        description: `${localityName} is now in your watchlist. You'll receive updates about price changes.`
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const removeMutation = useMutation({
    mutationFn: async () => {
      const watchlistItem = watchlist?.find((item: any) => item.localityName === localityName);
      if (!watchlistItem) throw new Error('Item not found in watchlist');
      
      const res = await fetch(`/api/watchlist/${watchlistItem.id}`, {
        method: 'DELETE',
        headers: { 'x-session-id': sessionId }
      });
      if (!res.ok) throw new Error('Failed to remove from watchlist');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/watchlist'] });
      queryClient.invalidateQueries({ queryKey: ['/api/watchlist/check', localityName] });
      toast({
        title: "Removed from Watchlist",
        description: `${localityName} has been removed from your watchlist.`
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const isLoading = checkLoading || addMutation.isPending || removeMutation.isPending;

  const handleClick = () => {
    if (inWatchlist) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  return (
    <Button
      variant={inWatchlist ? "default" : variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={className}
      data-testid="button-watchlist-toggle"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : inWatchlist ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-2" />
          In Watchlist
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-2" />
          Add to Watchlist
        </>
      )}
    </Button>
  );
}
