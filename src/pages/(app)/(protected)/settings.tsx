
import { signOut, useUser } from 'deepspace'
import { Button } from '@/components/ui'
import { APP_NAME } from '../../../constants'

export default function SettingsPage() {
  const { user } = useUser()

  return (
    <div className="min-h-full text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">

        <header className="mb-10">
          <p className="mb-2 text-sm text-muted-foreground">
            Workspace / Settings
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Settings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your account and application information.
          </p>
        </header>

        <div className="space-y-6">

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Your account</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your authenticated account information.
              </p>
            </div>

            <dl className="space-y-5">
              <div>
                <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Name
                </dt>
                <dd className="text-sm font-medium">
                  {user?.name ?? 'Not available'}
                </dd>
              </div>

              <div>
                <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Email address
                </dt>
                <dd className="text-sm font-medium">
                  {user?.email ?? 'Not available'}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Application</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Information about your DevTrace installation.
            </p>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Application
                </dt>
                <dd className="text-sm font-medium">
                  {APP_NAME}
                </dd>
              </div>

              <div>
                <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Version
                </dt>
                <dd className="text-sm font-medium">0.0.1</dd>
              </div>

              <div>
                <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Platform
                </dt>
                <dd className="text-sm font-medium">
                  Cloudflare Workers
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Session</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign out of your DevTrace account on this device.
            </p>

            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </section>

        </div>

        <footer className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            DevTrace Journal · Version 0.0.1
          </p>
        </footer>

      </div>
    </div>
  )
}
