# Acaraga API

Acaraga REST API is a web service that provides access to [acaraga](https://acaraga-api.com/).

## Tech Stack

- [Hono](https://hono.dev/) over [Bun](https://bun.sh/) runtime
- [Typescript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Render](https://render.com/)
- [Neon](https://neon.tech/)

## API Specification
-----------------------------------------------------------------
| Endpoint                     |HTTP     | Description          |
|------------------------------|--------------------------------|                                
| `/events`                    | `GET`   | Get all events       |
| `/events`                    | `POST`  | Create a new event   |
| `/events/{id}`               | `DELETE`| Delete event by ID   |
| `/events/{id}`               | `PATCH` | Update event by ID   |
| `/categories`                | `GET`   | Get all categories   |
| `/categories/{categorySlug}` | `GET`   | Get category by slug |
-----------------------------------------------------------------
The OpenAPI Specification for the Acaraga API offers a detailed description of the API's services. It can be accessed at the path `/openapi.json`.

We use **Scalar** to provide a modern, interactive interface for exploring and testing the endpoints. You can access the documentation directly at the root path `/`.



## Database Design
Gunakan opsi ini jika Anda hanya ingin menyisipkan tautan tanpa menampilkan kodenya.

```markdown
## Database Design

Berikut adalah rancangan database (ERD) untuk sistem ini yang mencakup manajemen Event, Lokasi, dan Kategori.

[Buka Visualisasi Database di Prismaliser ↗](https://prismaliser.app?code=Cm1vZGVsIEV2ZW50IHsKICBpZCAgICAgICAgICBTdHJpbmcgIEBpZCBAZGVmYXVsdCh1bGlkKCkpCiAgc2x1ZyAgICAgICAgU3RyaW5nICBAdW5pcXVlCiAgbmFtZSAgICAgICAgU3RyaW5nCiAgaW1hZ2VVcmwgICAgU3RyaW5nPwogIGRlc2NyaXB0aW9uIFN0cmluZz8KCiAgbG9jYXRpb24gICBMb2NhdGlvbj8gQHJlbGF0aW9uKGZpZWxkczogW2xvY2F0aW9uSWRdLCByZWZlcmVuY2VzOiBbaWRdKQogIGxvY2F0aW9uSWQgU3RyaW5nPwoKICBkYXRlVGltZVN0YXJ0IERhdGVUaW1lCiAgZGF0ZVRpbWVFbmQgICBEYXRlVGltZQoKICByZWdpc3RyYXRpb25VcmwgU3RyaW5nPwogIHJlZ2lzdHJhdGlvbkZlZSBJbnQKCiAgY2F0ZWdvcnkgICBDYXRlZ29yeT8gQHJlbGF0aW9uKGZpZWxkczogW2NhdGVnb3J5SWRdLCByZWZlcmVuY2VzOiBbaWRdKQogIGNhdGVnb3J5SWQgU3RyaW5nPwoKICBjcmVhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpCiAgdXBkYXRlZEF0IERhdGVUaW1lIEB1cGRhdGVkQXQKfQoKbW9kZWwgQ2F0ZWdvcnkgewogIGlkICAgU3RyaW5nIEBpZCBAZGVmYXVsdCh1bGlkKCkpCiAgc2x1ZyBTdHJpbmcgQHVuaXF1ZQogIG5hbWUgU3RyaW5nIEB1bmlxdWUKCiAgZXZlbnRzIEV2ZW50W10KCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAdXBkYXRlZEF0Cn0KCm1vZGVsIExvY2F0aW9uIHsKICBpZCAgICAgICAgU3RyaW5nIEBpZCBAZGVmYXVsdCh1bGlkKCkpCiAgc2x1ZyAgICAgIFN0cmluZyBAdW5pcXVlCiAgbmFtZSAgICAgIFN0cmluZwogIGFkZHJlc3MgICBTdHJpbmcKICBjaXR5ICAgICAgU3RyaW5nCiAgcHJvdmluY2UgIFN0cmluZwogIGxhdGl0dWRlICBGbG9hdD8KICBsb25naXR1ZGUgRmxvYXQ_CgogIGV2ZW50cyBFdmVudFtdCn0K) 



## Getting Started

Set up `.env` by copying from `.env.example` for reference

```sh
cp .env.example .env
```

Install dependencies

```sh
bun install
```
Database Setup
```sh
bun run db:up
```

Run DB migration

```sh
bun run db:migrate
```

Then you can run

```sh
bun run dev
```

Afterwards, open your browser and navigate to http://localhost:3000 to start exploring the API.
