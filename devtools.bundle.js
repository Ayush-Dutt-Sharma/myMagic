(() => {
  "use strict";
  let e = null;
  e = chrome;
  const t =
      `${atob("SWxHOU5ybEI")}0m3_${() => "3yb!d35"}3` +
      atob(
        "ZjkyN2JiNTA5ZGZhYWZjMTAyZTgxMzEzYjQwODZlZGUwYjgxNTRmMTEwODNkNGZmNTQ3ZDk0NzJhZjA5MjIxNg"
      ),
    n = atob(
      "YTQ3M2EzODlhZDc4ZTgxODEzYjNkMDI1ZjgwYjE4Yzk2MDk4Njk4NjMxODc1MDgxNzJkNTdkNWU4NGYxMGE1Mg"
    ),
    a = atob(
      "ODQ2MzlhMGM0YWU2Y2FmMjgwZDljMDI1Mjg5YzNjN2I0OTQxY2QxMmNkM2NiM2Y5NDEzNzc3OTY4OGIxZTc2NA"
    );
  async function o(e) {
    const n = new TextEncoder(),
      a = await window.crypto.subtle.digest("SHA-256", n.encode(e + t));
    return new Uint8Array(a).toString();
  }
  async function s(e) {
    const o = await (async function (e) {
      const o = new TextEncoder(),
        s = await window.crypto.subtle.importKey(
          "raw",
          o.encode(t),
          "PBKDF2",
          !1,
          ["deriveKey"]
        ),
        r = await window.crypto.subtle.deriveKey(
          {
            name: "PBKDF2",
            salt: o.encode(n),
            iterations: 1e3,
            hash: "SHA-256",
          },
          s,
          { name: "AES-GCM", length: 256 },
          !1,
          ["encrypt", "decrypt"]
        ),
        i = await window.crypto.subtle.decrypt(
          { name: "AES-GCM", iv: o.encode(a) },
          r,
          new Uint8Array(e.split(",").map(Number))
        );
      return JSON.parse(new TextDecoder().decode(i));
    })(e);
    return JSON.parse(o);
  }
  function r(t) {
    return new Promise((n, a) => {
      e.storage.local.get(t, (r) => {
        if (e.runtime.lastError) return void a(e.runtime.lastError);
        const i = r[t];
        i && i.d
          ? s(i.d)
              .then(async (e) => {
                const t = JSON.stringify(e);
                (await o(t)) !== i.c && n({}), n(e);
              })
              .catch((e) => {
                n({});
              })
          : n({});
      });
    });
  }
  function i(e) {
    if (!(e instanceof Element)) return "";
    let t = "",
      n = e;
    for (; n && "html" !== n.tagName.toLowerCase(); ) {
      const e = n.tagName.toLowerCase(),
        { parentElement: a } = n;
      if (a) {
        const o = [...a.children].filter((t) => t.tagName.toLowerCase() === e);
        if (1 === o.length) t = `/${e}${t}`;
        else {
          const a = o.findIndex((e) => e === n) + 1;
          t = `/${e}[${a}]${t}`;
        }
        n = a;
      }
    }
    return `/html${t}`;
  }
  (async () => {
    let e = null;
    e = chrome;
    const t = i.toString();
    let n = !1;
    function a() {
      const a = `${Date.now()}-${Math.random().toString(36)}`;
      e.devtools.panels.create("DivMagic", "icon-32.png", "panel.html", (o) => {
        o.onShown.addListener((t) => {
          if (
            (e.runtime.sendMessage({
              source: "devtools",
              type: "panelMounted",
            }),
            n)
          )
            return;
          (n = !0), (t.uniquePanelId = a);
          const o = new CustomEvent("uniquePanelIdSet");
          t.dispatchEvent(o);
        }),
          (function (a) {
            e.runtime.onMessage.addListener((o) => {
              "object" == typeof o &&
                "panel" === o.source &&
                "getSelectedElement" === o.type &&
                o.uniquePanelId === a &&
                ((n = !0),
                e.devtools.inspectedWindow.eval(
                  `  ($0 ? {\n                    tagName: $0.tagName, \n                    id: $0.id, \n                    className: $0.className,\n                    xpath: ${t}($0)\n                  } : {})\n                `,
                  (t, n) => {
                    n ||
                      e.runtime.sendMessage({
                        source: "devtools",
                        type: "elementSelected",
                        payload: t,
                        uniquePanelId: a,
                      });
                  }
                ));
            });
          })(a),
          e.devtools.panels.elements.onSelectionChanged.addListener(() => {
            n &&
              e.devtools.inspectedWindow.eval(
                `  ($0 ? {\n                  tagName: $0.tagName, \n                  id: $0.id, \n                  className: $0.className,\n                  xpath: ${t}($0)\n                } : {})\n              `,
                (t, n) => {
                  n ||
                    e.runtime.sendMessage(
                      {
                        source: "devtools",
                        type: "elementSelected",
                        payload: t,
                        uniquePanelId: a,
                      },
                      () => {
                        e.runtime.lastError;
                      }
                    );
                }
              );
          });
      });
    }
    const o = await r("divmagic-user-settings-v2");
    o ? o.showDevToolsPanel && a() : a();
  })();
})();