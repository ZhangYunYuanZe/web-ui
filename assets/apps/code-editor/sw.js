const cacheName = 'BrowserCache_v1';

const precachedAssets = [
    'index.html',
    'init.js',
    'codemirror.js',
    'codemirror.css',
    'mode/markdown/markdown.js',
    'mode/markdown/index.js',
    'addon/mode/simple.js'
    'mode/modelica/modelica.js'
    'mode/modelica/index.html'
    'mode/eiffel/eiffel.js'
    'mode/eiffel/index.html'
    'mode/mathematica/mathematica.js'
    'mode/mathematica/index.html'
    'mode/stex/test.js'
    'mode/stex/index.html'
    'mode/stex/stex.js'
    'mode/python/test.js'
    'mode/python/index.html'
    'mode/python/python.js'
    'mode/clike/clike.js'
    'mode/clike/scala.html'
    'mode/clike/test.js'
    'mode/clike/index.html'
    'mode/xml/xml.js'
    'mode/xml/test.js'
    'mode/xml/index.html'
    'mode/elm/elm.js'
    'mode/elm/index.html'
    'mode/cobol/cobol.js'
    'mode/cobol/index.html'
    'mode/vbscript/vbscript.js'
    'mode/vbscript/index.html'
    'mode/jinja2/jinja2.js'
    'mode/jinja2/index.html'
    'mode/ecl/ecl.js'
    'mode/ecl/index.html'
    'mode/puppet/puppet.js'
    'mode/puppet/index.html'
    'mode/tiddlywiki/tiddlywiki.css'
    'mode/tiddlywiki/tiddlywiki.js'
    'mode/tiddlywiki/index.html'
    'mode/javascript/typescript.html'
    'mode/javascript/javascript.js'
    'mode/javascript/json-ld.html'
    'mode/javascript/test.js'
    'mode/javascript/index.html'
    'mode/brainfuck/brainfuck.js'
    'mode/brainfuck/index.html'
    'mode/mumps/mumps.js'
    'mode/mumps/index.html'
    'mode/rst/rst.js'
    'mode/rst/index.html'
    'mode/factor/factor.js'
    'mode/factor/index.html'
    'mode/r/r.js'
    'mode/r/index.html'
    'mode/toml/toml.js'
    'mode/toml/index.html'
    'mode/properties/properties.js'
    'mode/properties/index.html'
    'mode/xquery/xquery.js'
    'mode/xquery/test.js'
    'mode/xquery/index.html'
    'mode/webidl/webidl.js'
    'mode/webidl/index.html'
    'mode/sparql/sparql.js'
    'mode/sparql/index.html'
    'mode/d/test.js'
    'mode/d/index.html'
    'mode/d/d.js'
    'mode/lua/index.html'
    'mode/lua/lua.js'
    'mode/ttcn/ttcn.js'
    'mode/ttcn/index.html'
    'mode/mbox/mbox.js'
    'mode/mbox/index.html'
    'mode/coffeescript/coffeescript.js'
    'mode/coffeescript/index.html'
    'mode/idl/idl.js'
    'mode/idl/index.html'
    'mode/commonlisp/index.html'
    'mode/commonlisp/commonlisp.js'
    'mode/octave/octave.js'
    'mode/octave/index.html'
    'mode/apl/apl.js'
    'mode/apl/index.html'
    'mode/z80/z80.js'
    'mode/z80/index.html'
    'mode/css/scss.html'
    'mode/css/gss_test.js'
    'mode/css/less.html'
    'mode/css/scss_test.js'
    'mode/css/gss.html'
    'mode/css/less_test.js'
    'mode/css/test.js'
    'mode/css/index.html'
    'mode/css/css.js'
    'mode/twig/twig.js'
    'mode/twig/index.html'
    'mode/jsx/test.js'
    'mode/jsx/jsx.js'
    'mode/jsx/index.html'
    'mode/meta.js'
    'mode/swift/swift.js'
    'mode/swift/test.js'
    'mode/swift/index.html'
    'mode/asn.1/asn.1.js'
    'mode/asn.1/index.html'
    'mode/crystal/crystal.js'
    'mode/crystal/index.html'
    'mode/tornado/tornado.js'
    'mode/tornado/index.html'
    'mode/gas/gas.js'
    'mode/gas/index.html'
    'mode/haxe/haxe.js'
    'mode/haxe/index.html'
    'mode/powershell/powershell.js'
    'mode/powershell/test.js'
    'mode/powershell/index.html'
    'mode/pig/index.html'
    'mode/pig/pig.js'
    'mode/ttcn-cfg/ttcn-cfg.js'
    'mode/ttcn-cfg/index.html'
    'mode/go/go.js'
    'mode/go/index.html'
    'mode/turtle/turtle.js'
    'mode/turtle/index.html'
    'mode/ruby/ruby.js'
    'mode/ruby/test.js'
    'mode/ruby/index.html'
    'mode/haskell/haskell.js'
    'mode/haskell/index.html'
    'mode/tcl/tcl.js'
    'mode/tcl/index.html'
    'mode/soy/test.js'
    'mode/soy/soy.js'
    'mode/soy/index.html'
    'mode/ebnf/ebnf.js'
    'mode/ebnf/index.html'
    'mode/q/q.js'
    'mode/q/index.html'
    'mode/asterisk/asterisk.js'
    'mode/asterisk/index.html'
    'mode/handlebars/handlebars.js'
    'mode/handlebars/index.html'
    'mode/sieve/sieve.js'
    'mode/sieve/index.html'
    'mode/velocity/velocity.js'
    'mode/velocity/index.html'
    'mode/yaml-frontmatter/yaml-frontmatter.js'
    'mode/yaml-frontmatter/index.html'
    'mode/http/http.js'
    'mode/http/index.html'
    'mode/dart/dart.js'
    'mode/dart/index.html'
    'mode/dylan/test.js'
    'mode/dylan/dylan.js'
    'mode/dylan/index.html'
    'mode/cypher/test.js'
    'mode/cypher/index.html'
    'mode/cypher/cypher.js'
    'mode/cmake/cmake.js'
    'mode/cmake/index.html'
    'mode/yacas/yacas.js'
    'mode/yacas/index.html'
    'mode/solr/solr.js'
    'mode/solr/index.html'
    'mode/fortran/index.html'
    'mode/fortran/fortran.js'
    'mode/pascal/pascal.js'
    'mode/pascal/index.html'
    'mode/yaml/yaml.js'
    'mode/yaml/index.html'
    'mode/diff/diff.js'
    'mode/diff/index.html'
    'mode/php/php.js'
    'mode/php/test.js'
    'mode/php/index.html'
    'mode/perl/index.html'
    'mode/perl/perl.js'
    'mode/julia/index.html'
    'mode/julia/julia.js'
    'mode/gherkin/gherkin.js'
    'mode/gherkin/index.html'
    'mode/forth/forth.js'
    'mode/forth/index.html'
    'mode/scheme/index.html'
    'mode/scheme/scheme.js'
    'mode/vb/vb.js'
    'mode/vb/index.html'
    'mode/haml/haml.js'
    'mode/haml/test.js'
    'mode/haml/index.html'
    'mode/vue/vue.js'
    'mode/vue/index.html'
    'mode/protobuf/index.html'
    'mode/protobuf/protobuf.js'
    'mode/erlang/erlang.js'
    'mode/erlang/index.html'
    'mode/asciiarmor/asciiarmor.js'
    'mode/asciiarmor/index.html'
    'mode/rust/rust.js'
    'mode/rust/test.js'
    'mode/rust/index.html'
    'mode/nsis/nsis.js'
    'mode/nsis/index.html'
    'mode/htmlembedded/htmlembedded.js'
    'mode/htmlembedded/index.html'
    'mode/sass/sass.js'
    'mode/sass/test.js'
    'mode/sass/index.html'
    'mode/markdown/markdown.js'
    'mode/markdown/test.js'
    'mode/markdown/index.html'
    'mode/htmlmixed/htmlmixed.js'
    'mode/htmlmixed/index.html'
    'mode/haskell-literate/index.html'
    'mode/haskell-literate/haskell-literate.js'
    'mode/stylus/stylus.js'
    'mode/stylus/index.html'
    'mode/dockerfile/dockerfile.js'
    'mode/dockerfile/test.js'
    'mode/dockerfile/index.html'
    'mode/django/django.js'
    'mode/django/index.html'
    'mode/ntriples/ntriples.js'
    'mode/ntriples/index.html'
    'mode/smarty/smarty.js'
    'mode/smarty/index.html'
    'mode/mirc/mirc.js'
    'mode/mirc/index.html'
    'mode/slim/slim.js'
    'mode/slim/test.js'
    'mode/slim/index.html'
    'mode/groovy/groovy.js'
    'mode/groovy/index.html'
    'mode/shell/shell.js'
    'mode/shell/test.js'
    'mode/shell/index.html'
    'mode/index.html'
    'mode/pegjs/pegjs.js'
    'mode/pegjs/index.html'
    'mode/fcl/index.html'
    'mode/fcl/fcl.js'
    'mode/pug/pug.js'
    'mode/pug/index.html'
    'mode/textile/test.js'
    'mode/textile/index.html'
    'mode/textile/textile.js'
    'mode/sql/sql.js'
    'mode/sql/index.html'
    'mode/oz/oz.js'
    'mode/oz/index.html'
    'mode/mllike/mllike.js'
    'mode/mllike/index.html'
    'mode/livescript/livescript.js'
    'mode/livescript/index.html'
    'mode/rpm/rpm.js'
    'mode/rpm/changes/index.html'
    'mode/rpm/index.html'
    'mode/mscgen/mscgen.js'
    'mode/mscgen/mscgen_test.js'
    'mode/mscgen/xu_test.js'
    'mode/mscgen/msgenny_test.js'
    'mode/mscgen/index.html'
    'mode/troff/index.html'
    'mode/troff/troff.js'
    'mode/smalltalk/smalltalk.js'
    'mode/smalltalk/index.html'
    'mode/spreadsheet/spreadsheet.js'
    'mode/spreadsheet/index.html'
    'mode/gfm/gfm.js'
    'mode/gfm/test.js'
    'mode/gfm/index.html'
    'mode/clojure/test.js'
    'mode/clojure/index.html'
    'mode/clojure/clojure.js'
    'mode/vhdl/index.html'
    'mode/vhdl/vhdl.js'
    'mode/tiki/tiki.css'
    'mode/tiki/tiki.js'
    'mode/tiki/index.html'
    'mode/verilog/verilog.js'
    'mode/verilog/test.js'
    'mode/verilog/index.html'
    'mode/sas/sas.js'
    'mode/sas/index.html'
    'mode/nginx/nginx.js'
    'mode/nginx/index.html'
    'mode/dtd/index.html'
    'mode/dtd/dtd.js'
];

self.addEventListener('install', event =>  {
      event.waitUntil(caches.open(cacheName).then((cache) => {
        return cache.addAll(precachedAssets);
      }));
    self.skipWaiting();
});
self.addEventListener('activate', event => {
    clients.claim();
});

self.onfetch = event => {
    const url = event.request.url

    let requestURL = new URL(url);
    if (event.request.mode === 'navigate' && !requestURL.pathname.startsWith('/api')) {
        if (requestURL.pathname == '/') {
            return event.respondWith(Response.redirect('index.html', 302));
        } else {
            event.respondWith(caches.open(cacheName).then((cache) => {
                return fetch(event.request.url).then((fetchedResponse) => {
                    cache.put(event.request, fetchedResponse.clone());
                    
                    return fetchedResponse;
                }).catch(() => {
                    return cache.match(event.request.url);
                });
            }));
        }
    }    
}

