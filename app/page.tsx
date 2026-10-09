import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Orbit, Sparkles, Telescope, Compass, Rocket } from "lucide-react"

import { Suspense } from "react"

type Project = {
  id: string
  title: string
  description: string
  images?: string[]
  created_at: string
}

async function ProjectsList() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, description, images, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao carregar projetos:", error.message)
  }

  const list = (projects as Project[] | null) ?? []

  return (
    <>
      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-cyan-500/20 bg-slate-950/40 backdrop-blur-md py-24 text-center px-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400">
            <Telescope className="h-6 w-6" />
          </div>
          <p className="text-lg font-medium text-slate-300">
            Nenhuma missão espacial ou projeto registrado ainda.
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Novos projetos serão sincronizados e exibidos nesta constelação em breve.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {list.map((project) => (
            <Card
              key={project.id}
              className="relative overflow-hidden group bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] hover:-translate-y-1 flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-cyan-500/10 via-purple-500/5 to-transparent rounded-full -mr-10 -mt-10 pointer-events-none group-hover:from-cyan-500/20 transition-all" />

              {/* Se tiver imagens, mostra a primeira em destaque ou galeria */}
              {project.images && project.images.length > 0 && (
                <div className="relative aspect-video w-full overflow-hidden border-b border-cyan-500/20 bg-slate-950/80">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {project.images.length > 1 && (
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                      +{project.images.length - 1} fotos
                    </span>
                  )}
                </div>
              )}

              <CardHeader className="relative z-10 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                    <Sparkles className="h-3 w-3" />
                    Missão
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {new Date(project.created_at).toLocaleDateString("pt-PT", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 flex-1 space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>

                {/* Se houver mais do que 1 imagem, exibe as miniaturas adicionais */}
                {project.images && project.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {project.images.slice(1).map((imgUrl, idx) => (
                      <div key={idx} className="relative aspect-square rounded-md overflow-hidden border border-cyan-500/20 bg-slate-950/60">
                        <img
                          src={imgUrl}
                          alt={`${project.title} miniatura ${idx + 2}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header com estilo observatório */}
      <header className="border-b border-cyan-500/15 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <Orbit className="h-5 w-5 animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                Project Space
              </h1>
              <p className="text-[11px] text-cyan-400/80 tracking-widest uppercase font-mono">
                Observatório Cósmico
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400/80 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1.5 rounded-full">
            <Compass className="h-3.5 w-3.5 text-cyan-400" />
            <span>Coordenadas: 00° RA / +00° Dec</span>
          </div>
        </div>
      </header>

      {/* Hero Cósmico */}
      <main className="mx-auto max-w-5xl px-6 py-12 flex-1 w-full">
        <div className="mb-12 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 mb-4 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
            <Rocket className="h-3.5 w-3.5" />
            Exploração & Arquitetura Espacial
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Catálogo de Projetos
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Navegue pelos projetos estelares e iniciativas tecnológicas desenvolvidas na órbita do ecossistema.
          </p>
        </div>

        <Suspense fallback={
          <div className="py-24 text-center">
            <div className="inline-flex items-center gap-3 text-cyan-400 font-mono text-sm">
              <Orbit className="h-5 w-5 animate-spin" />
              Sincronizando telemetria espacial...
            </div>
          </div>
        }>
          <ProjectsList />
        </Suspense>
      </main>

      {/* Rodapé Galáctico */}
      <footer className="border-t border-cyan-500/15 bg-slate-950/80 backdrop-blur-md mt-auto">
        <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 text-slate-400">
            <Orbit className="h-4 w-4 text-cyan-400" />
            <span>Project Space &copy; {new Date().getFullYear()} — Plataforma Cósmica</span>
            <span className="opacity-5">Pontocom</span>
          </div>
          <div className="font-mono text-cyan-400/60">
            Semana Espacial v10.0
          </div>
        </div>
      </footer>
    </div>
  )
}
