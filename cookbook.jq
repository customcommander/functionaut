
# Takes the raw input which is one big list with all the symbols
# for all cookbook recipes. Group related symbols together
# so that each sub list contains all the symbols for one
# (and only one) cookbook recipe.
def get_recipes:
    map(select(.meta))
  | group_by(.meta.filename);

# Small blurb can be located on the first line.
def example_has_title:
    .[0]
  | startswith("//");

# Extract blurb from comment line
def example_get_title:
    .[0]
  | ltrimstr("//")
  | ltrimstr(" ");

# Take a string, extract blurb (if any) and the recipe code.
def transform_example:
    split("\n")
  | if example_has_title then
      { title: example_get_title
      , body: (.[1:] | join("\n")) }
    else
      { title: null
      , body: join("\n") }
    end;

# Extract examples from a list of symbols
def get_examples:
  map(select(.examples))[0].examples;

# Assumes filename is the cookbook recipe name.
def get_recipe_name:
    .[0]
  | .meta.filename
  | rtrimstr(".js");

# A recipe is about showcasing a specific function.
def get_recipe_main_function:
  map(select(.meta.code.value == "sut"))[0].name;

# A recipe will probably involve other functions from the library.
def get_recipe_related_functions:
  map(select(.meta.code.type == "Identifier" and .meta.code.value != "sut") | .meta.code.name);

# Transforms lists of symbols into an object describing
# a specific cookbook recipe.
def transform_recipe:
  { name: get_recipe_name
  , main: get_recipe_main_function
  , related: get_recipe_related_functions
  , examples: (get_examples | map(transform_example))};


# main
get_recipes | map(transform_recipe)