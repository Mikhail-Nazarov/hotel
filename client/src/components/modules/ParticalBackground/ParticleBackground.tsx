import { FC } from "react";
import "./ParticleBackground.scss";

const ParticleBackground: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="particle-background">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
      {children}
    </div>
  );
};
export default ParticleBackground;
