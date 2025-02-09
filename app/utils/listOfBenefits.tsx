import {
  Users,
  Umbrella,
  Clock,
  Home,
  UserPlus,
  Wifi,
  Utensils,
  HeartPulse,
  BusFront,
  School,
  ShieldCheck,
  HandHelping,
  PiggyBank,
  FileText,
  HandCoinsIcon,
} from "lucide-react";

interface Benefit {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// export const benefits: Benefit[] = [
//   { id: "401k", label: "401(k)", icon: <Briefcase className="w-3 h-3" /> },
//   {
//     id: "distributed",
//     label: "Distributed team",
//     icon: <Users className="w-3 h-3" />,
//   },
//   { id: "async", label: "Async", icon: <Zap className="w-3 h-3" /> },
//   {
//     id: "vision",
//     label: "Vision insurance",
//     icon: <Eye className="w-3 h-3" />,
//   },
//   {
//     id: "dental",
//     label: "Dental insurance",
//     icon: <Tooth className="w-3 h-3" />,
//   },
//   {
//     id: "medical",
//     label: "Medical insurance",
//     icon: <Heart className="w-3 h-3" />,
//   },
//   {
//     id: "unlimited_vacation",
//     label: "Unlimited vacation",
//     icon: <Umbrella className="w-3 h-3" />,
//   },
//   { id: "pto", label: "Paid time off", icon: <Clock className="w-3 h-3" /> },
//   {
//     id: "four_day",
//     label: "4 day workweek",
//     icon: <Calendar className="w-3 h-3" />,
//   },
//   {
//     id: "401k_matching",
//     label: "401k matching",
//     icon: <Coins className="w-3 h-3" />,
//   },
//   {
//     id: "company_retreats",
//     label: "Company retreats",
//     icon: <Building className="w-3 h-3" />,
//   },
//   {
//     id: "coworking_budget",
//     label: "Coworking budget",
//     icon: <Building className="w-3 h-3" />,
//   },
//   {
//     id: "learning_budget",
//     label: "Learning budget",
//     icon: <GraduationCap className="w-3 h-3" />,
//   },
//   {
//     id: "gym",
//     label: "Free gym membership",
//     icon: <Dumbbell className="w-3 h-3" />,
//   },
//   {
//     id: "mental_wellness",
//     label: "Mental wellness budget",
//     icon: <Brain className="w-3 h-3" />,
//   },
//   {
//     id: "home_office",
//     label: "Home office budget",
//     icon: <Home className="w-3 h-3" />,
//   },
//   {
//     id: "crypto",
//     label: "Pay in crypto",
//     icon: <Bitcoin className="w-3 h-3" />,
//   },
//   {
//     id: "pseudonymous",
//     label: "Pseudonymous",
//     icon: <UserCircle className="w-3 h-3" />,
//   },
//   {
//     id: "profit_sharing",
//     label: "Profit sharing",
//     icon: <PieChart className="w-3 h-3" />,
//   },
//   {
//     id: "equity",
//     label: "Equity compensation",
//     icon: <Coins className="w-3 h-3" />,
//   },
//   {
//     id: "no_whiteboard",
//     label: "No whiteboard interview",
//     icon: <MonitorOff className="w-3 h-3" />,
//   },
//   {
//     id: "no_monitoring",
//     label: "No monitoring system",
//     icon: <Shield className="w-3 h-3" />,
//   },
//   {
//     id: "hire_old_young",
//     label: "We hire old (and young)",
//     icon: <UserPlus className="w-3 h-3" />,
//   },
// ];
export const benefits: Benefit[] = [
  {
    id: "healthcare",
    label: "Healthcare coverage",
    icon: <HeartPulse className="w-3 h-3" />,
  },

  {
    id: "vacation",
    label: "Paid vacation",
    icon: <Umbrella className="w-3 h-3" />,
  },
  {
    id: "working_hours",
    label: "Flexible working hours",
    icon: <Clock className="w-3 h-3" />,
  },
  {
    id: "transport",
    label: "Company-provided transport",
    icon: <BusFront className="w-3 h-3" />,
  },
  {
    id: "housing",
    label: "Housing allowance",
    icon: <Home className="w-3 h-3" />,
  },
  {
    id: "training",
    label: "Professional training programs",
    icon: <School className="w-3 h-3" />,
  },
  {
    id: "meals",
    label: "Subsidized meals",
    icon: <Utensils className="w-3 h-3" />,
  },
  {
    id: "retirement",
    label: "Retirement plan",
    icon: <ShieldCheck className="w-3 h-3" />,
  },
  {
    id: "team_spirit",
    label: "Team-building activities",
    icon: <Users className="w-3 h-3" />,
  },
  {
    id: "internet",
    label: "Internet allowance",
    icon: <Wifi className="w-3 h-3" />,
  },
  {
    id: "family_support",
    label: "Family support programs",
    icon: <HandHelping className="w-3 h-3" />,
  },
  {
    id: "savings_plan",
    label: "Employee savings plan",
    icon: <PiggyBank className="w-3 h-3" />,
  },
  {
    id: "legal_aid",
    label: "Legal assistance",
    icon: <FileText className="w-3 h-3" />,
  },
  {
    id: "profit_sharing",
    label: "Profit sharing",
    icon: <HandCoinsIcon className="w-3 h-3" />,
  },
  {
    id: "diversity",
    label: "Diversity and inclusion policy",
    icon: <UserPlus className="w-3 h-3" />,
  },
];
