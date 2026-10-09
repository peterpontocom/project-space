import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban } from "lucide-react"

export const dynamic = "force-dynamic"

type Project = {
  id: string
  title: string
  description: string
  created_at: string
}

export default async function Home() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, description, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao carregar projetos:", error.message)
  }

  const list = (projects as Project[] | null) ?? []

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-6 flex items-center gap-3">
          <FolderKanban className="h-6 w-6 text-foreground" />
          <h1 className="text-xl font-semibold tracking-tight">Project Space</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">Projetos</h2>
          <p className="mt-2 text-muted-foreground">
            Explore os projetos publicados na plataforma.
          </p>
        </div>

        {list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-20 text-center">
            <p className="text-muted-foreground">
              Nenhum projeto publicado ainda.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {list.map((project) => (
              <Card key={project.id} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className={"text-lg"}>{project.title}</CardTitle>
                  <CardDescription>
                    {new Date(project.created_at).toLocaleDateString("pt-PT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-muted-foreground">
          Project Space — plataforma de projetos
        </div>
      </footer>
    </div>
  )
}
