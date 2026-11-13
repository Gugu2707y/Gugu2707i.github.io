"""Verifica o site antes de publicar e atualiza a versão (cache) dos arquivos.
Uso (na pasta do projeto):  python tools/verificar_site.py
1) Recalcula ?v=... nos links de css/js de todas as páginas (o navegador baixa a versão nova).
2) Confere se TODO arquivo citado (páginas, css, js, imagens do assets-data.js) existe com o
   nome EXATO (o GitHub Pages diferencia maiúsculas/minúsculas e acentos)."""
import glob, hashlib, os, re, subprocess, sys, json, urllib.parse
raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(raiz)

# --- 1) versão ---
arqs = sorted(glob.glob('css/*.css') + glob.glob('js/*.js'))
h = hashlib.sha1()
for a in arqs: h.update(open(a, 'rb').read())
ver = h.hexdigest()[:10]
for pag in glob.glob('*.html'):
    t = open(pag, encoding='utf-8', newline='').read()
    n = re.sub(r'((?:href|src)="(?:css|js)/[^"?]+\.(?:css|js))(?:\?v=[^"]*)?"', lambda m: f'{m.group(1)}?v={ver}"', t)
    if n != t: open(pag, 'w', encoding='utf-8', newline='').write(n)
print('Versão dos arquivos:', ver)

# --- 2) existência com nome exato (sensível a maiúsculas) ---
def existe(caminho):
    partes = caminho.replace('\\', '/').split('/'); atual = '.'
    for p in partes:
        if p in ('', '.'): continue
        if p not in os.listdir(atual): return False
        atual = os.path.join(atual, p)
    return True
erros = []
for pag in glob.glob('*.html'):
    t = open(pag, encoding='utf-8').read()
    for m in re.finditer(r'(?:href|src)="([^"#]+)"', t):
        u = m.group(1)
        if re.match(r'^(https?:|mailto:|data:|//)', u): continue
        u = urllib.parse.unquote(u.split('?')[0])
        if not existe(u): erros.append(f'{pag}: não encontrei "{u}"')
js = open('js/assets-data.js', encoding='utf-8').read()
node = subprocess.run(['node', '-e', 'global.window={};require("./js/assets-data.js");console.log(JSON.stringify(window.OV_ASSETS))'], capture_output=True, text=True)
if node.returncode == 0:
    d = json.loads(node.stdout)
    for lista, pasta in (('personagens', d['pasta']), ('npcs', d['pastaNpcs']), ('mapas', d['pastaMapas'])):
        for it in d[lista]:
            for campo in ('file', 'thumb'):
                if it.get(campo) and not existe(pasta + it[campo]): erros.append(f'assets-data.js: {lista} {it["n"]} -> não encontrei "{pasta}{it[campo]}"')
else:
    print('(Node.js não encontrado: pulei a conferência das imagens do assets-data.js)')
print('\n'.join(erros) if erros else 'Tudo certo: todos os arquivos citados existem com o nome exato.')
sys.exit(1 if erros else 0)
