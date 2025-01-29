import { LucideIconName } from "@/constants/types";
import { icons, LucideProps } from "lucide-react-native";
import { MotiProps } from "moti";
import { motifySvg } from "moti/svg";

type IconProps = LucideProps & {
  name: LucideIconName;
  color?: string;
  size?: number;
} & MotiProps;

export function Icon({ name, color = "#000", size = 18, ...rest }: IconProps) {
  // @ts-ignore
  const LucideIcon = motifySvg(icons[name])();

  return <LucideIcon color={color} size={size} {...rest} />;
}
