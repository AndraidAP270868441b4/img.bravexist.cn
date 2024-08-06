import { error } from 'itty-router-extras';

export interface Env {
  AUTH_TOKEN: https://img.bravexist.cn
  COPY_URL: https://img.bravexist.cn
  R2: R2Bucket
}

export const onRequest: PagesFunction<Env> = async (context : EventContext) => {
  const { router } = await import('./router').then(
    async (module) => (await import('./routes'), module)
  );

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: Response | undefined = await router.handle(context.request, context.env);
    return response ?? error(404, 'not found');
  } catch (err) {
    return error(500, (err as Error).message);
  }
};
