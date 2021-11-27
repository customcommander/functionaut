def trim:
  sub("^\\s*"; "")
    | sub("\\s*$"; "");

def function_name:
  .meta.filename
    | rtrimstr(".js");

def is_curried:
  (.tags // [])
    | contains([{title: "curried"}]);

def is_transducer:
  (.tags // [])
    | contains([{title: "transducer"}]);

def params:
  .params
    | map(.type |= .names);

def returns:
  .returns[0]
    | .type |= .names;

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
  (.examples // []) | map(split("\n") | {
    description: example_description,
    code: example_code,
    annotations: example_annotations
  });

map(select(.longname == "module.exports") | {
  function_name: function_name,
  is_curried: is_curried,
  is_transducer: is_transducer,
  summary,
  description,
  params: params,
  returns: returns,
  examples: examples
})
