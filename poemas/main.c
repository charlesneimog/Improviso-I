/* Copyright (C) 2023 Charles K. Neimog
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

#include <assert.h>              /* assert */
#include <emscripten/em_asm.h>   /* EM_ASM */
#include <emscripten/webaudio.h> /* WebAudio API  */
#include <z_libpd.h>             /* libpd */

void routetype_setup(void);
void lb_setup(void);
void prepend_setup(void);
void gate_setup(void);
void envgen_tilde_setup(void);
void blocksize_tilde_setup(void);
void message_setup(void);
void rint_setup(void);
void format_setup(void);
void selector_setup(void);
void floor_setup(void);
void router_setup(void);
void wrap2_setup(void);
void args_setup(void);
void loadbanger_setup(void);
void slice_setup(void);
void click_tilde_setup(void);
void sig2float_tilde_setup(void);
void loop_setup(void);
void xgate_tilde_setup(void);
void vu_tilde_setup(void);
void earplug_tilde_setup(void);
void grainer_tilde_setup(void);
void setup_giga0x2erev_tilde(void);
void spread_setup(void);
void round_setup(void);

// ========== AUDIO CONFIG =============
uint8_t patchAudioInputs = 1;
uint8_t patchAudioOutputs = 2;
uint8_t wasmAudioWorkletStack[1024 * 1024];
int samplerate = 48000;

// ================ GUI ================
pthread_mutex_t WriteReadMutex = PTHREAD_MUTEX_INITIALIZER;

char* HTML_IDS[] = {"ui_process1note", "ui_p5js_clearcanvas", "ui_draw", "ui_p5js_clearcanvas", "ui_draw", "ui_p5js_clearcanvas", "ui_draw", "ui_showScore", "ui_notename", "ui_draw", "ui_randomform", "ui_randomlettercolor", "ui_showScore", "ui_notename", "ui_draw", "ui_showScore", "ui_notename", "ui_randomform", "ui_randomlettercolor", "ui_clearallcanvas", "ui_backgroundfinish"};
int HTML_IDS_SIZE = 21;

typedef struct pdItem {
  const char *receiverID;
  float f;
  const char *s;
  t_atom *list;
  int listSize;
  int type;
  int changed;
} pdItem;

// ====================
typedef struct pdItemHash {
  pdItem **items;
  int size;
  int count;
} pdItemHash;

struct pdItemHash *receiverHash;
int pdWebValueArraySize = 128;
/* IF THERE IS MORE THAN 32 VALUES, INCREASE THIS
                              VALUE TODO: Add this on pd2wasm */

// ====================
void safe_memcpy(void *dest, size_t destSize, const void *src, size_t srcSize) {
  if (dest && src && destSize >= srcSize) {
    memcpy(dest, src, srcSize);
  } else {
    EM_ASM_({ alert("Error on memcpy"); });
  }
}

// ====================
static pdItemHash *CreatePdItemHash(int size) {
  pdItemHash *hash_table = (pdItemHash *)malloc(sizeof(pdItemHash));
  hash_table->size = size;
  hash_table->count = 0;
  hash_table->items = (pdItem **)calloc(size, sizeof(pdItem *));
  return hash_table;
}

// ====================
static unsigned int HashFunction(pdItemHash *hash_table, const char *key) {
  unsigned long hash = 5381;
  int c;
  while ((c = *key++)) {
    hash = ((hash << 5) + hash) + c;
  }
  return hash % hash_table->size;
}

// ====================
static void InsertList(pdItemHash *hash_table, const char *key, int size,
                       t_atom *list) {
  unsigned int index = HashFunction(hash_table, key);
  pthread_mutex_lock(&WriteReadMutex);
  pdItem *item = hash_table->items[index];
  if (item == NULL && hash_table->count <= hash_table->size) {
    item = (pdItem *)malloc(sizeof(pdItem));
    item->receiverID = strdup(key);
    item->list = malloc(sizeof(t_atom) * size);
    // memcpy(item->list, list, sizeof(t_atom) * size);
    safe_memcpy(item->list, sizeof(t_atom) * size, list, sizeof(t_atom) * size);
    item->listSize = size;
    item->type = A_GIMME;
    item->changed = 1;
    hash_table->items[index] = item;
    hash_table->count++;
  } else if (hash_table->count > hash_table->size) {
    EM_ASM_({
      alert("Hash table is full, please report this in " +
            "github.com/charlesneimog/pd4web");
    });
  } else if (item != NULL) {
    item->list = list;
    item->changed = 1;
    item->type = A_GIMME;
  }
  pthread_mutex_unlock(&WriteReadMutex);
  return;
}

// ====================
static void InsertFloat(pdItemHash *hash_table, const char *key, float f) {
  unsigned int index = HashFunction(hash_table, key);
  pthread_mutex_lock(&WriteReadMutex);
  pdItem *item = hash_table->items[index];
  if (item == NULL && hash_table->count <= hash_table->size) {
    item = (pdItem *)malloc(sizeof(pdItem));
    item->receiverID = strdup(key);
    item->f = f;
    item->type = A_FLOAT;
    item->changed = 1;
    hash_table->items[index] = item;
    hash_table->count++;
  } else if (hash_table->count > hash_table->size) {
    EM_ASM_({
      alert("Hash table is full, please report this in " +
            "github.com/charlesneimog/pd4web");
    });
  } else if (item != NULL) {
    item->f = f;
    item->changed = 1;
    item->type = A_FLOAT;
  }
  pthread_mutex_unlock(&WriteReadMutex);
  return;
}

// ====================
static void InsertSymbol(pdItemHash *hash_table, const char *key,
                         const char *thing) {
  unsigned int index = HashFunction(hash_table, key);
  pthread_mutex_lock(&WriteReadMutex);
  pdItem *item = hash_table->items[index];
  if (item == NULL && hash_table->count <= hash_table->size) {
    item = (pdItem *)malloc(sizeof(pdItem));
    item->receiverID = strdup(key);
    item->s = strdup(thing);
    item->type = A_SYMBOL;
    item->changed = 1;
    hash_table->items[index] = item;
    hash_table->count++;
  } else if (hash_table->count > hash_table->size) {
    EM_ASM_({
      alert("Hash table is full, please report this in " +
            "github.com/charlesneimog/pd4web");
    });
  } else if (item != NULL) {
    item->s = strdup(thing);
    item->changed = 1;
    item->type = A_SYMBOL;
  }
  pthread_mutex_unlock(&WriteReadMutex);
  return;
}

// ====================
static pdItem *GetItem(pdItemHash *hash_table, char *key) {
  unsigned int index = HashFunction(hash_table, key);
  pthread_mutex_lock(&WriteReadMutex);

  pdItem *item = hash_table->items[index];
  if (item != NULL) {
    pthread_mutex_unlock(&WriteReadMutex);
    return item;
  }
  pthread_mutex_unlock(&WriteReadMutex);
  return NULL;
}

// =====================================
// ============= HELPERS ===============
// =====================================
void pdprint(const char *s);

EMSCRIPTEN_KEEPALIVE
void *webpd_malloc(int size) { return malloc(size); }

// ======================================
EMSCRIPTEN_KEEPALIVE
void webpd_free(void *ptr) { free(ptr); }

// ======================================
EMSCRIPTEN_KEEPALIVE
int sendFloatToPd(const char *receiver, float value) {
  libpd_float(receiver, value);
  return 0;
}

// ======================================
EMSCRIPTEN_KEEPALIVE
int sendSymbolToPd(const char *receiver, const char *symbol) {
  return libpd_symbol(receiver, symbol);
}

// ======================================
EMSCRIPTEN_KEEPALIVE
int sendBangToPd(const char *receiver) { return libpd_bang(receiver); }

// ======================================
// ============= libpd HOOKS ============
// ======================================

void pdprint(const char *s) {
  if (s[0] == '\n') {
    return;
  }
  EM_ASM_({ console.log(UTF8ToString($0)); }, s);
}

// ========================================
void receiveListfromPd(const char *src, int argc, t_atom *argv) {
  InsertList(receiverHash, (char *)src, argc, argv);
}

// ========================================
void receiveFloatfromPd(const char *receiver, float value) {
  InsertFloat(receiverHash, (char *)receiver, value);
}

// ========================================
static void receiveSymbolfromPd(const char *receiver, const char *thing) {
  InsertSymbol(receiverHash, (char *)receiver, (char *)thing);
}

// ========================================
// to remove warning about not defined
void sys_gui_midipreferences(void) { return; }

// ============= WEB AUDIO ================
static EM_BOOL ProcessPdPatch(int numInputs, const AudioSampleFrame *inputs,
                              int numOutputs, AudioSampleFrame *outputs,
                              int numParams, const AudioParamFrame *params,
                              void *userData) {
  int outCh = outputs[0].numberOfChannels;
  float tmpOutputs[128 * 2];
  libpd_process_float(2, inputs[0].data,
                      tmpOutputs); // TODO: ADD INPUTS AND OUTPUTS FOR pd2wasm.
  int outputIndex = 0;
  for (int i = 0; i < outCh; i++) {
    for (int j = i; j < (128 * outCh); j += 2) {
      outputs[0].data[outputIndex] = tmpOutputs[j];
      outputIndex++;
    }
  }
  libpd_bang("pd4webtick");
  return EM_TRUE;
}
// ========================================
// clang-format off
EM_JS(int, GetAudioSampleRate, (EMSCRIPTEN_WEBAUDIO_T audioContext), {
    return emscriptenGetAudioObject(audioContext).sampleRate;
});

// ========================================
EM_JS(void, LoadFinished, (void), {
    JS_LoadFinished();
});

// ========================================
EM_JS(void, AddUIButtons, (EMSCRIPTEN_WEBAUDIO_T audioContext, EMSCRIPTEN_AUDIO_WORKLET_NODE_T audioWorkletNode), {
    audioContext = emscriptenGetAudioObject(audioContext);
    audioWorkletNode = emscriptenGetAudioObject(audioWorkletNode);
    JS_AddUIButtons(audioContext, audioWorkletNode);
});
// clang-format on
// ========================================
void AudioWorkletProcessorCreated(EMSCRIPTEN_WEBAUDIO_T audioContext,
                                  EM_BOOL success, void *userData) {
  if (!success) {
    return;
  }
  int outputChannelCounts[1] = {2};
  /* Stereo output TODO: Need to see how this
    work for more than 2 channels */
  EmscriptenAudioWorkletNodeCreateOptions options = {
      .numberOfInputs = 1,
      .numberOfOutputs = 1,
      .outputChannelCounts = outputChannelCounts,
  };

  EMSCRIPTEN_AUDIO_WORKLET_NODE_T wasmAudioWorklet =
      emscripten_create_wasm_audio_worklet_node(audioContext, "libpd-processor",
                                                &options, &ProcessPdPatch, 0);
  AddUIButtons(audioContext, wasmAudioWorklet);
  libpd_set_listhook(receiveListfromPd);
  libpd_set_floathook(receiveFloatfromPd);
  libpd_set_symbolhook(receiveSymbolfromPd);
  libpd_set_printhook(pdprint);
  libpd_init();

  routetype_setup();
  lb_setup();
  prepend_setup();
  gate_setup();
  envgen_tilde_setup();
  blocksize_tilde_setup();
  message_setup();
  rint_setup();
  format_setup();
  selector_setup();
  floor_setup();
  router_setup();
  wrap2_setup();
  args_setup();
  loadbanger_setup();
  slice_setup();
  click_tilde_setup();
  sig2float_tilde_setup();
  loop_setup();
  xgate_tilde_setup();
  vu_tilde_setup();
  earplug_tilde_setup();
  grainer_tilde_setup();
  setup_giga0x2erev_tilde();
  spread_setup();
  round_setup();

  for (int i = 0; i < HTML_IDS_SIZE; i++) {
    libpd_bind(HTML_IDS[i]);
  }
  libpd_add_to_search_path("webpatch/data/");
  libpd_add_to_search_path("webpatch/data/Audios/");
  libpd_start_message(1);
  libpd_add_float(1.0f);
  libpd_finish_message("pd", "dsp");
  libpd_init_audio(patchAudioInputs, patchAudioOutputs,
                   GetAudioSampleRate(audioContext));
  if (!libpd_openfile("index.pd", "webpatch/data")) {
    EM_ASM_({ alert("Failed to open patch!"); });
    return;
  }
  EM_ASM_({ JS_LoadFinished(); });
  printf("Block size: %d\n", libpd_blocksize());
}

// ========================================
void WebAudioWorkletThreadInitialized(EMSCRIPTEN_WEBAUDIO_T audioContext,
                                      EM_BOOL success, void *userData) {
  if (!success) {
    return;
  }
  WebAudioWorkletProcessorCreateOptions opts = {
      .name = "libpd-processor",
  };
  emscripten_create_wasm_audio_worklet_processor_async(
      audioContext, &opts, AudioWorkletProcessorCreated, 0);
}

// ========================================
// clang-format off
EM_JS(void, setFloatValue, (const char* symbol, float value), {
    if (typeof JS_setFloat === "function"){
        JS_setFloat(UTF8ToString(symbol), value);
    }
});

// ========================================
EM_JS(void, setSymbolValue, (const char* symbol, const char* value), {
    if (typeof JS_setSymbol === "function"){
        JS_setSymbol(UTF8ToString(symbol), UTF8ToString(value));
    }
});

// clang-format on
// ========================================
void PdWebCompiler_Loop() {
  for (int i = 0; i < HTML_IDS_SIZE; i++) {
    pdItem *item = GetItem(receiverHash, HTML_IDS[i]);
    if (item == NULL)
      continue;
    if (item->changed) {
      item->changed = 0;
      if (item->type == A_FLOAT) {
        setFloatValue(HTML_IDS[i], item->f);
      } else if (item->type == A_SYMBOL) {
        setSymbolValue(HTML_IDS[i], item->s);
      } else {
        EM_ASM_({ alert("Unknown type"); });
        return;
      }
    }
  }
}

// ========================================
int main() {
  srand(time(NULL));
  assert(!emscripten_current_thread_is_audio_worklet());

  EmscriptenWebAudioCreateAttributes attrs = {
      .latencyHint = "interactive",
  };
  EMSCRIPTEN_WEBAUDIO_T context = emscripten_create_audio_context(&attrs);
  samplerate = GetAudioSampleRate(context);
  emscripten_start_wasm_audio_worklet_thread_async(
      context, wasmAudioWorkletStack, sizeof(wasmAudioWorkletStack),
      WebAudioWorkletThreadInitialized, 0);
  receiverHash = CreatePdItemHash(pdWebValueArraySize);
  emscripten_set_main_loop(PdWebCompiler_Loop, 30,
                           1); /* 30 FPS TODO: check this from pd4web */
}
