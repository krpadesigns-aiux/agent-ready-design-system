import { type ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  contained?: boolean;
}

export function Section({
  children,
  className = "",
  id,
  contained = true,
}: SectionProps) {
  return (
    <section
      id={id}
      style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
      className={className}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
