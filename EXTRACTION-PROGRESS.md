# Extracción Full-Clean de código Enterprise — Progreso

Rama: `agpl-clean` (sin commits; `main` = rollback). Repo movido a `C:\dev\twenty`
(fuera de OneDrive). `git config core.longpaths true` ya seteado.

## Comando de verificación (baseline AGPL)
```
cd packages/twenty-server && ../../node_modules/.bin/tsgo -p tsconfig.json
```
Bypassa la cadena `nx ^build` (que rompe en Windows por `twenty-sdk:build` con globs
`rimraf` entre comillas simples). yarn shim instalado en `%AppData%\npm` vía corepack.

Criterio de checkpoint: **cero errores en archivos sin `@license Enterprise`**
(los errores residuales viven en archivos Enterprise aún no stubbeados/borrados).

## Hecho y verificado (server-side, AGPL en verde en cada paso)
- **Auth / SSO / enterprise-license / JWT-rotation**: removido. Incluye split del archivo
  mixto `available-workspaces.dto` (preservado `AvailableWorkspace` AGPL, dropeado SSO),
  corte SSO end-to-end (entity relation, `AuthProviders.sso`, util, client-config),
  límite de workspaces sin key eliminado (ahora ilimitado), specs ajustados.
- **Event-logs viewer / audit**: removido (feature de lectura). Backbone emit/ingest/
  producers/live-service AGPL intacto. `event-log-registry` era viewer-only.
- **Domains (Cloudflare/DNS/emailing)**: `DnsManagerService` y `UnsubscribeHostnameService`
  → **stub AGPL** (custom domains/unsubscribe deshabilitados con gracia). Controller/guard
  webhook Cloudflare borrados.

Server Enterprise: **229 → 73** archivos.

## Fase 3 (Billing) — COMPLETA ✅
Server: **0 archivos @license Enterprise**, tsgo verde. Borrados webhook/stripe-subtree/
app-billing/servicios-deep/job/listener/migrate-command. Stubbeados (graceful-disable, firmas
preservadas): billing.service, billing-subscription.service, billing-usage.service,
usage-analytics.service. billing.exception + filter → AGPL. Recableados core-engine.module,
jobs.module, 2-4-upgrade module, billing/usage.module.

## Fase 4 (Row-level permissions) — COMPLETA server-side ✅
Server + twenty-shared: **0 archivos @license Enterprise**, tsgo EXIT=0.
- **Aplicación stubbeada (seguro)**: 4 utils del ORM — apply (no-op), validate (no-op),
  build (→null), is-matching (matcher genérico → strip AGPL, lo usa el subscriptions publisher).
  Sin predicados de fila, las queries quedan acotadas SOLO por object/field-level (= sin Enterprise;
  no expone nada que object-level ya no permita).
- **Gestión stubbeada**: 2 services (findBy*→[], upsert→throw FEATURE_DISABLED). Cache services
  flat-row-level → computeForCache mapa vacío. role.resolver intacto (schema GraphQL estable).
- **Datos→AGPL (strip)**: entities/dtos/types/exceptions/constants + 5 tipos twenty-shared.
- **Infra migración→AGPL (strip, funcional)**: 12 builders/validators/action-handlers (boilerplate
  del framework por entity, igual a object/field/role; mantiene integridad de esquema/FKs).
- Borrados 8 utils from-* huérfanos. Módulo recableado sin EnterpriseModule.
- ⚠️ **NO verificado runtime**: tsgo valida tipos, no el arranque del metadata system ni el filtrado
  de permisos. Requiere levantar stack + tests de integración de permisos para confirmar.

## Fase 5 (Front) — COMPLETA ✅
Front: **0 archivos @license Enterprise**. Verificador: `tsgo -p tsconfig.json --noEmit`
(baseline de ruido confinado a `modules/front-components/` por paquete `twenty-front-component-renderer`
sin construir — twenty-sdk:build rompe en Windows). Sin regresiones nuevas tras los cambios.
- **SSO** (~28): borrados componentes/hooks/states/types/utils/validation + page. Montajes limpiados:
  SignInUp, SignInUpWorkspaceScopeForm(+Effect), SettingsSecuritySettings, AuthProvidersOptionsList,
  SettingsRoutes.
- **Domains** (4): borrados SettingsCustomDomain(Page)/hook/effect + ruta.
- **Record-level** (21): borrado el dir `record-level-permissions/` (13 UI) + montaje en
  ObjectLevelObjectForm (gate billing RLS + validación de predicados → quitados). 2 object-record
  hooks RLS → stub neutro (opciones sin filtrar / input vacío). 4 graphql (fragments/mutation/hook)
  → strip AGPL (el backend mantiene los campos inertes; la rama de upsert en useSaveDraftRoleToDB
  nunca se dispara sin UI de gestión).
- ⚠️ Regenerar GraphQL (`nx run twenty-front:graphql:generate`) al levantar el stack: el generated
  `graphql.ts` tiene campos SSO/enterprise removidos del backend (Fase 1-2); compila, pero conviene
  regenerar para limpiar tipos muertos.

## Cierre — COMPLETO ✅
- **`grep @license Enterprise packages` → 0** en todo el repo (server/front/shared/ui/emails/sdk).
- **LICENSE raíz + twenty-ui/LICENSE → AGPL v3 puro** (removida la sección "Twenty.com Commercial
  License" y el preámbulo dual-license; 661 líneas, 0 menciones comerciales).
- `IS_BILLING_ENABLED = false` por default (y los stubs lo neutralizan aunque se active).
- Pendiente opcional (al levantar entorno): lint+fmt, regenerar GraphQL front, validación runtime
  de permisos (ver ⚠️ Fase 4).

## Notas
- No commitear (el usuario armará su propio repo de GitHub al final).
- Stubs marcados con comentario `// ponytail:` explicando que la feature Enterprise quedó
  deshabilitada y cómo re-habilitarla.
- Rebranding (marca "Twenty") y validación legal: fuera de alcance de este trabajo.
