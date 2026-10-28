import { Atom, BookOpen, Braces, BrainCircuit, ChartNoAxesCombined, Code2, Database, Layers3, Palette, Server, Sprout, Terminal, Wind, GraduationCap, Sparkles } from 'lucide-react'
const iconMap = { Code2, Palette, Braces, Atom, Wind, Terminal, Server, Database, Layers3, ChartNoAxesCombined, BrainCircuit, Sprout }
export function CourseIcon({ name='Code2', size=24 }) {
  const Icon = iconMap[name] || Code2
  return <Icon size={size} strokeWidth={1.8} />
}
export { GraduationCap, Sparkles }
