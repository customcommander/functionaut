def trim:
  sub("^\\s*"; "")
    | sub("\\s*$"; "");

def function_name:
  .meta.filename
    | rtrimstr(".js");

# Search for words that can be linked to the glossary.
def glossary:
    gsub("(?<w>predicates?)"; "[\(.w)](../manual/glossary.md#predicate)"; "i")
  | gsub("(?<w>`?nil`?)"; "[\(.w)](../manual/glossary.md#nil)"; "i")
  | gsub("(?<w>logical (true|truth))"; "[\(.w)](../manual/glossary.md#logical-truth)"; "i")
  | gsub("(?<w>logical (false|falsity))"; "[\(.w)](../manual/glossary.md#logical-falsity)"; "i")
  | gsub("(?<w>operator function)"; "[\(.w)](../manual/glossary.md#operator-function)"; "i")
  | gsub("(?<w>functional placeholder)"; "[\(.w)](../manual/glossary.md#functional-placeholder)"; "i");

def is_curried:
  (.tags // [])
    | contains([{title: "curried"}]);

def is_operator:
  if (.tags // [] | contains([{title: "operator"}]) | not) then null else
    "This is an operator function." | glossary
  end;

def is_transducer:
  (.tags // [])
    | contains([{title: "transducer"}]);

def params:
  if (.params | not) then null else
    .params |
      map(.type |= .names | .description |= (. // "" | glossary))
  end;

def returns:
  if (.returns | not) then null else
    .returns[0]
      | .type |= .names
  end;

def example_description:
  .[0] | if startswith("//") | not then null else
    ltrimstr("//") | trim
  end;

def is_example_annotation:
  test("^//\\s*\\d+\\s*:");

def example_code:
  if .[0] | startswith("//") then .[1:] else . end
    | map(select(is_example_annotation | not))
      | join("\n");

def example_annotations:
  map(select(is_example_annotation)
    | ltrimstr("//")
      | trim
        | split(":")
          | [(.[0] | trim), (.[1:] | join(":"))]
            | {ref: .[0], text: .[1]});

def examples:
  if .examples | not then null else
    .examples | map(split("\n") | {
      description: example_description,
      code: example_code,
      annotations: example_annotations
    })
  end;

def summary:
  .summary | glossary;

def description:
  .description // "" | glossary;

map(select(.longname == "module.exports") | {
  function_name: function_name,
  is_curried: is_curried,
  is_operator: is_operator,
  is_transducer: is_transducer,
  summary: summary,
  description: description,
  params: params,
  returns: returns,
  examples: examples
})
