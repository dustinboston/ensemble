/* File generated automatically by the QuickJS compiler. */

#include "quickjs-libc.h"

const uint32_t qjsc_test_fib_size = 160;

const uint8_t qjsc_test_fib[160] = {
 0x02, 0x07, 0x28, 0x65, 0x78, 0x61, 0x6d, 0x70,
 0x6c, 0x65, 0x73, 0x2f, 0x74, 0x65, 0x73, 0x74,
 0x5f, 0x66, 0x69, 0x62, 0x2e, 0x6a, 0x73, 0x10,
 0x2e, 0x2f, 0x66, 0x69, 0x62, 0x2e, 0x73, 0x6f,
 0x06, 0x66, 0x69, 0x62, 0x0e, 0x63, 0x6f, 0x6e,
 0x73, 0x6f, 0x6c, 0x65, 0x06, 0x6c, 0x6f, 0x67,
 0x16, 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57,
 0x6f, 0x72, 0x6c, 0x64, 0x10, 0x66, 0x69, 0x62,
 0x28, 0x31, 0x30, 0x29, 0x3d, 0x0f, 0xc6, 0x03,
 0x01, 0xc8, 0x03, 0x00, 0x00, 0x01, 0x00, 0xca,
 0x03, 0x00, 0x00, 0x0e, 0x20, 0x06, 0x01, 0xa2,
 0x01, 0x00, 0x00, 0x00, 0x05, 0x01, 0x00, 0x32,
 0x00, 0xca, 0x03, 0x00, 0x0c, 0x08, 0xec, 0x02,
 0x29, 0x38, 0xe6, 0x00, 0x00, 0x00, 0x42, 0xe7,
 0x00, 0x00, 0x00, 0x04, 0xe8, 0x00, 0x00, 0x00,
 0x24, 0x01, 0x00, 0x0e, 0x38, 0xe6, 0x00, 0x00,
 0x00, 0x42, 0xe7, 0x00, 0x00, 0x00, 0x04, 0xe9,
 0x00, 0x00, 0x00, 0x66, 0x00, 0x00, 0xbf, 0x0a,
 0xf1, 0x24, 0x02, 0x00, 0x0e, 0x06, 0x2e, 0xc6,
 0x03, 0x01, 0x05, 0x01, 0x00, 0x04, 0x0a, 0x62,
};

static JSContext *JS_NewCustomContext(JSRuntime *rt)
{
  JSContext *ctx = JS_NewContextRaw(rt);
  if (!ctx)
    return NULL;
  JS_AddIntrinsicBaseObjects(ctx);
  JS_AddIntrinsicDate(ctx);
  JS_AddIntrinsicEval(ctx);
  JS_AddIntrinsicStringNormalize(ctx);
  JS_AddIntrinsicRegExp(ctx);
  JS_AddIntrinsicJSON(ctx);
  JS_AddIntrinsicProxy(ctx);
  JS_AddIntrinsicMapSet(ctx);
  JS_AddIntrinsicTypedArrays(ctx);
  JS_AddIntrinsicPromise(ctx);
  JS_AddIntrinsicBigInt(ctx);
  {
    extern JSModuleDef *js_init_module_fib(JSContext *ctx, const char *name);
    js_init_module_fib(ctx, "examples/fib.so");
  }
  return ctx;
}

int main(int argc, char **argv)
{
  JSRuntime *rt;
  JSContext *ctx;
  rt = JS_NewRuntime();
  js_std_set_worker_new_context_func(JS_NewCustomContext);
  js_std_init_handlers(rt);
  JS_SetModuleLoaderFunc(rt, NULL, js_module_loader, NULL);
  ctx = JS_NewCustomContext(rt);
  js_std_add_helpers(ctx, argc, argv);
  js_std_eval_binary(ctx, qjsc_test_fib, qjsc_test_fib_size, 0);
  js_std_loop(ctx);
  js_std_free_handlers(rt);
  JS_FreeContext(ctx);
  JS_FreeRuntime(rt);
  return 0;
}
