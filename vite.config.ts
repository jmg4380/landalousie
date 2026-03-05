import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig, loadEnv } from 'vite';

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const plugins = [
    devtools(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      sitemap: {
        enabled: true,
        host: env.SITE_URL,
      },
    }),

    viteReact(),
  ];

  if (mode === 'production') {
    plugins.push(
      nitro({
        preset: 'vercel',
        vercel: {
          entryFormat: 'node',
        },
      })
    );
  }

  return {
    plugins,
    server: {
      allowedHosts: ['host.docker.internal'],
    },
  };
});

export default config;
