export default function DebugTheme() {
  const Box = ({ name, varName }: { name: string; varName: string }) => (
    <div className="p-4 rounded-md border border-border mb-3"
         style={{ backgroundColor: `hsl(var(${varName}))` }}>
      <div className="text-sm">#{name}: <code>{getComputedStyle(document.documentElement).getPropertyValue(varName)}</code></div>
    </div>
  )
  return (
    <div className="p-6 space-y-4 bg-background text-foreground">
      <Box name="background" varName="--background" />
      <Box name="foreground" varName="--foreground" />
      <Box name="input" varName="--input" />
      <Box name="border" varName="--border" />
    </div>
  )
}
