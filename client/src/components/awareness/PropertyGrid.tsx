import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  TrendingUp, 
  MapPin, 
  Ruler, 
  AlertCircle,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PropertyWithRelevance, PropertyMicroInsight } from "@/lib/awareness-engine/types";
import { useState } from "react";

interface PropertyCardProps {
  property: PropertyWithRelevance;
  onSave?: (id: string) => void;
  onView?: (id: string) => void;
  isSaved?: boolean;
}

function MicroInsightBadge({ insight }: { insight: PropertyMicroInsight }) {
  const styles = {
    positive: "bg-green-100 text-green-700 border-green-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    urgent: "bg-red-100 text-red-700 border-red-200"
  };
  
  return (
    <Badge className={cn("text-[10px] font-bold border", styles[insight.sentiment])}>
      {insight.text}
    </Badge>
  );
}

export function PersonalizedPropertyCard({ property, onSave, onView, isSaved }: PropertyCardProps) {
  return (
    <div className="group transition-transform duration-200 hover:-translate-y-1">
      <Card className="overflow-hidden rounded-2xl border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
        <div className="relative h-40 bg-background ">
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-white/90 text-slate-900 font-bold text-[10px] backdrop-blur-sm">
              {property.property_type}
            </Badge>
            <Badge className="bg-primary text-white font-bold text-[10px]">
              {property.relevance_score}% Match
            </Badge>
          </div>
          <button 
            onClick={() => onSave?.(property.property_id)}
            className={cn(
              "absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center transition-all",
              isSaved 
                ? "bg-red-500 text-white" 
                : "bg-white/90 text-slate-400 hover:text-red-500"
            )}
          >
            <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-background ">
            <div className="text-white font-semibold text-xl">₹{property.price}</div>
          </div>
        </div>
        
        <div className="p-4">
          <h4 className="font-bold text-primary line-clamp-1 mb-1">{property.title}</h4>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <MapPin className="h-3 w-3" />
            <span>{property.locality}</span>
            <span className="text-slate-300">•</span>
            <Ruler className="h-3 w-3" />
            <span>{property.area_sqft} sq.ft.</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {property.micro_insights.slice(0, 2).map((insight, i) => (
              <MicroInsightBadge key={i} insight={insight} />
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {property.strategy_tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-[9px] font-bold uppercase tracking-wider">
                {tag}
              </Badge>
            ))}
          </div>
          
          <p className="text-xs text-slate-500 italic mb-4 line-clamp-2">
            "{property.reason_for_inclusion}"
          </p>
          
          <Button 
            onClick={() => onView?.(property.property_id)}
            className="w-full h-10 rounded-xl font-bold text-sm bg-primary hover:bg-primary/90 transition-colors"
          >
            View Details <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

interface PropertyGridProps {
  properties: PropertyWithRelevance[];
  savedIds?: string[];
  onSave?: (id: string) => void;
  onView?: (id: string) => void;
}

export function PersonalizedPropertyGrid({ properties, savedIds = [], onSave, onView }: PropertyGridProps) {
  return (
    <div className="space-y-6 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-green-100 text-green-700 border-none mb-2">
            Block 5: Personalized Listings
          </Badge>
          <h3 className="text-2xl font-semibold text-primary">Properties Matched for You</h3>
          <p className="text-slate-500 text-sm">Ranked by relevance to your goals</p>
        </div>
        <Badge variant="outline" className="font-bold">
          {properties.length} matches
        </Badge>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PersonalizedPropertyCard
            key={property.property_id}
            property={property}
            isSaved={savedIds.includes(property.property_id)}
            onSave={onSave}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
}
