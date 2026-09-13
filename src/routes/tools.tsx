import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input, Label, SelectField } from "@/components/ui/input";
import { useJournal } from "@/lib/store";

export const Route = createFileRoute("/tools")({ component: ToolsPage });

type Goal = "lose" | "maintain" | "gain";

function ToolsPage() {
  const saveCalculator = useJournal((s) => s.saveCalculator);
  const saved = useJournal((s) => s.calculator);
  const [sex, setSex] = useState<"f" | "m">("f");
  const [age, setAge] = useState("38");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("72");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState<Goal>("lose");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const result = useMemo(() => {
    const a = Number(age);
    let h = Number(height);
    let w = Number(weight);
    if (!a || !h || !w) return null;
    if (unit === "imperial") {
      h *= 2.54;
      w *= 0.453592;
    }
    const bmr = sex === "m" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * Number(activity);
    const calories =
      goal === "lose" ? tdee - 400 : goal === "gain" ? tdee + 250 : tdee;
    const proteinG = (goal === "lose" ? 2.0 : 1.8) * w;
    const fatG = (goal === "lose" ? 0.8 : 0.9) * w;
    const carbsG = (calories - proteinG * 4 - fatG * 9) / 4;
    return {
      tdee: Math.round(tdee),
      calories: Math.round(calories),
      protein: Math.round(proteinG),
      carbs: Math.max(0, Math.round(carbsG)),
      fat: Math.round(fatG),
    };
  }, [age, height, weight, sex, activity, goal, unit]);

  return (
    <div>
      <PageIntro
        eyebrow="Tools"
        title="Fuel the work."
        body="Mifflin–St Jeor, then a modest deficit or surplus. Protein first. Save the numbers to your journal."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 md:grid-cols-[1fr_0.9fr] md:px-8 md:pb-28">
        <form
          className="grid gap-4 rounded-2xl bg-bg-elevated p-6 shadow-border md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (!result) return;
            saveCalculator({ ...result, goal });
            toast.success("Targets saved to your journal.");
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="unit">Units</Label>
              <SelectField
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as "metric" | "imperial")}
              >
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </SelectField>
            </div>
            <div>
              <Label htmlFor="sex">Sex</Label>
              <SelectField id="sex" value={sex} onChange={(e) => setSex(e.target.value as "f" | "m")}>
                <option value="f">Female</option>
                <option value="m">Male</option>
              </SelectField>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="height">{unit === "metric" ? "Height (cm)" : "Height (in)"}</Label>
              <Input
                id="height"
                inputMode="decimal"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weight">{unit === "metric" ? "Weight (kg)" : "Weight (lb)"}</Label>
              <Input
                id="weight"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="activity">Training week</Label>
            <SelectField
              id="activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              <option value="1.2">Desk, 0–1 sessions</option>
              <option value="1.375">2–3 sessions</option>
              <option value="1.55">4–5 sessions</option>
              <option value="1.725">6+ sessions or physical job</option>
            </SelectField>
          </div>
          <div>
            <Label htmlFor="goal">Goal</Label>
            <SelectField id="goal" value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
              <option value="lose">Lose fat</option>
              <option value="maintain">Hold</option>
              <option value="gain">Build</option>
            </SelectField>
          </div>
          <Button type="submit" disabled={!result}>
            Save to journal
          </Button>
        </form>

        <div className="rounded-2xl bg-bg-elevated p-6 shadow-border md:p-8">
          {result ? (
            <>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Daily targets</p>
              <p className="mt-3 font-display text-6xl tabular-nums tracking-tight">
                {result.calories}
              </p>
              <p className="text-sm text-muted">kcal · TDEE {result.tdee}</p>
              <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
                {[
                  ["Protein", `${result.protein} g`],
                  ["Carbs", `${result.carbs} g`],
                  ["Fat", `${result.fat} g`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs uppercase tracking-[0.14em] text-subtle">{k}</dt>
                    <dd className="mt-1 font-display text-2xl tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                A starting point, not a prescription. If you train at Northline we
                will rewrite this against how you actually recover.
              </p>
              {saved ? (
                <p className="mt-4 text-xs text-subtle">
                  Last saved: {saved.calories} kcal, {saved.protein} g protein.
                </p>
              ) : null}
            </>
          ) : (
            <p className="text-muted">Enter age, height, and weight.</p>
          )}
        </div>
      </div>
    </div>
  );
}
