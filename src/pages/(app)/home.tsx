
import { useState } from 'react'
import {
  BookOpen,
  Code2,
  FileText,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Terminal,
  Clock3,
  X,
  Trash2,
  Pencil,
} from 'lucide-react'
import { useMutations, useQuery } from 'deepspace'

interface JournalEntry {
  title: string
  content: string
  entry_date: string
  tags: string
  mood: string
  created_at: string
  updated_at: string
}

const emptyForm = {
  title: '',
  content: '',
}

export default function HomePage() {
  const { records, status, error } =
    useQuery<JournalEntry>('journal_entries', {
      orderBy: 'created_at',
      orderDir: 'desc',
    })

  const {
    createConfirmed,
    putConfirmed,
    removeConfirmed,
    ready,
  } = useMutations<JournalEntry>('journal_entries')

  const [search, setSearch] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [saveError, setSaveError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const entries = records ?? []

  const filteredEntries = entries.filter((entry) =>
    `${entry.data.title} ${entry.data.content} ${entry.data.tags}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  function openNewEntry() {
    setEditingId(null)
    setTitle('')
    setContent('')
    setSaveError('')
    setSuccessMessage('')
    setShowEditor(true)
  }

  function openEditEntry(entry: (typeof entries)[number]) {
    setEditingId(entry.recordId)
    setTitle(entry.data.title)
    setContent(entry.data.content)
    setSaveError('')
    setSuccessMessage('')
    setShowEditor(true)
  }

  function closeEditor() {
    if (saving) return

    setShowEditor(false)
    setEditingId(null)
    setTitle('')
    setContent('')
    setSaveError('')
  }

  async function saveEntry() {
    if (!title.trim() || !content.trim() || !ready || saving) return

    setSaving(true)
    setSaveError('')
    setSuccessMessage('')

    const now = new Date().toISOString()

    try {
      if (editingId) {
        await putConfirmed(editingId, {
          title: title.trim(),
          content: content.trim(),
          updated_at: now,
        })

        setSuccessMessage('Journal entry updated.')
      } else {
        await createConfirmed({
          title: title.trim(),
          content: content.trim(),
          entry_date: now.slice(0, 10),
          tags: 'Development',
          mood: '',
          created_at: now,
          updated_at: now,
        })

        setSuccessMessage('Journal entry created.')
      }

      setShowEditor(false)
      setEditingId(null)
      setTitle('')
      setContent('')
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : 'Unable to save entry.',
      )
    } finally {
      setSaving(false)
    }
  }

  async function deleteEntry(id: string) {
    if (!window.confirm('Delete this journal entry?')) return

    setDeletingId(id)
    setSaveError('')

    try {
      await removeConfirmed(id)
      setSuccessMessage('Journal entry deleted.')
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : 'Unable to delete entry.',
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#090d14] text-slate-100 md:flex">

      {/* Sidebar */}
      <aside className="flex w-full flex-col border-b border-white/10 bg-[#0d131e] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">

        <div className="mb-10 flex items-center gap-3">
          <div className="rounded-xl bg-cyan-400/10 p-2 text-cyan-400">
            <Terminal size={23} />
          </div>

          <div>
            <h1 className="font-bold">DevTrace</h1>
            <p className="text-xs text-slate-500">Developer Journal</p>
          </div>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </p>

        <nav className="space-y-2">
          <a
            href="/home"
            className="flex items-center gap-3 rounded-lg bg-cyan-400/10 px-3 py-3 text-sm text-cyan-400"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </a>

          <a
            href="#entries"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-white/5"
          >
            <BookOpen size={18} />
            Journal Entries
          </a>

          <a
            href="#entries"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-white/5"
          >
            <FileText size={18} />
            Development Notes
          </a>
        </nav>

        <div className="mt-auto hidden pt-10 md:block">
          <a
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-white/5"
          >
            <Settings size={18} />
            Settings
          </a>

          <p className="mt-5 text-xs text-slate-600">
            DevTrace Journal v0.0.1
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 px-5 py-8 md:px-10">

        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Workspace / Dashboard
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              Your development journal
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Track your progress. Document your discoveries. Keep building.
            </p>
          </div>

          <button
            onClick={openNewEntry}
            disabled={!ready}
            className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-40"
          >
            <Plus size={18} />
            New entry
          </button>
        </header>

        {/* Notifications */}
        {successMessage && (
          <div
            role="status"
            className="mb-6 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-400"
          >
            {successMessage}
            <button
              onClick={() => setSuccessMessage('')}
              className="float-right"
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {saveError && !showEditor && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-400"
          >
            {saveError}
          </div>
        )}

        {/* Statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-[#101824] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">Total entries</p>
              <BookOpen className="text-cyan-400" size={20} />
            </div>

            <p className="text-3xl font-bold">{entries.length}</p>

            <p className="mt-2 text-xs text-slate-500">
              Journal records
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101824] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">Latest activity</p>
              <Clock3 className="text-violet-400" size={20} />
            </div>

            <p className="text-lg font-semibold">
              {entries[0]?.data.entry_date ?? 'No activity'}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Most recent journal entry
            </p>
          </div>
        </section>

        {/* Journal Entries */}
        <section
          id="entries"
          className="rounded-2xl border border-white/10 bg-[#101824]"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-6">

            <div>
              <h3 className="font-semibold">Recent entries</h3>
              <p className="mt-1 text-xs text-slate-500">
                Your latest development notes
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#090d14] px-3 py-2">
              <Search size={16} className="text-slate-500" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search entries..."
                className="w-36 bg-transparent text-sm outline-none placeholder:text-slate-600 sm:w-52"
              />
            </div>
          </div>

          <div className="divide-y divide-white/5">

            {status === 'loading' && (
              <p className="p-10 text-center text-sm text-slate-400">
                Loading journal entries...
              </p>
            )}

            {status === 'error' && (
              <p className="p-10 text-center text-sm text-red-400">
                {error ?? 'Unable to load journal entries.'}
              </p>
            )}

            {status === 'ready' && filteredEntries.map((entry) => (

              <article
                key={entry.recordId}
                className="flex items-start gap-4 p-6 hover:bg-white/[0.02]"
              >
                <div className="rounded-lg bg-cyan-400/10 p-3 text-cyan-400">
                  <Code2 size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold">
                    {entry.data.title}
                  </h4>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-400">
                    {entry.data.content}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="text-xs text-slate-500">
                      {entry.data.entry_date}
                    </span>

                    {entry.data.tags && (
                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-400">
                        {entry.data.tags}
                      </span>
                    )}

                    <span className="text-xs text-slate-600">
                      Updated {entry.data.updated_at}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">

                  <button
                    onClick={() => openEditEntry(entry)}
                    disabled={!ready || !!deletingId}
                    className="rounded-lg p-2 text-slate-500 hover:bg-cyan-400/10 hover:text-cyan-400 disabled:opacity-40"
                    aria-label={`Edit ${entry.data.title}`}
                    title="Edit entry"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteEntry(entry.recordId)}
                    disabled={!ready || deletingId !== null}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-400/10 hover:text-red-400 disabled:opacity-40"
                    aria-label={`Delete ${entry.data.title}`}
                    title="Delete entry"
                  >
                    {deletingId === entry.recordId ? (
                      <span className="text-xs">...</span>
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>

                </div>
              </article>
            ))}

            {status === 'ready' && filteredEntries.length === 0 && (
              <div className="p-12 text-center text-sm text-slate-500">
                {search
                  ? 'No matching entries found.'
                  : 'No journal entries yet. Create your first one!'}
              </div>
            )}
          </div>
        </section>

        {/* Create / Edit Modal */}
        {showEditor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="editor-title"
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#101824] p-6 shadow-2xl"
            >

              <div className="mb-6 flex items-center justify-between">
                <h3
                  id="editor-title"
                  className="text-lg font-semibold"
                >
                  {editingId ? 'Edit journal entry' : 'New journal entry'}
                </h3>

                <button
                  onClick={closeEditor}
                  disabled={saving}
                  className="text-slate-400 hover:text-white"
                  aria-label="Close editor"
                >
                  <X size={20} />
                </button>
              </div>

              <label
                htmlFor="entry-title"
                className="mb-2 block text-sm text-slate-400"
              >
                Title
              </label>

              <input
                id="entry-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="What did you work on?"
                className="mb-5 w-full rounded-lg border border-white/10 bg-[#090d14] px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />

              <label
                htmlFor="entry-content"
                className="mb-2 block text-sm text-slate-400"
              >
                Details
              </label>

              <textarea
                id="entry-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Document your progress, discoveries, bugs, or ideas..."
                rows={7}
                className="w-full resize-y rounded-lg border border-white/10 bg-[#090d14] px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />

              {saveError && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                  {saveError}
                </p>
              )}

              <div className="mt-6 flex justify-end gap-3">

                <button
                  onClick={closeEditor}
                  disabled={saving}
                  className="rounded-lg px-4 py-2 text-sm text-slate-400 hover:bg-white/5 disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  onClick={saveEntry}
                  disabled={
                    !title.trim() ||
                    !content.trim() ||
                    !ready ||
                    saving
                  }
                  className="rounded-lg bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-40"
                >
                  {saving
                    ? 'Saving...'
                    : editingId
                      ? 'Save changes'
                      : 'Create entry'}
                </button>

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}