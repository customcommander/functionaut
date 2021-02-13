def get_namespace:
  ( map(select(.kind == "namespace"))[0]
  | .longname
  | if . == "ROOT" then "" else . end);

def get_type_expr: (.names | join("|"));

def get_params:
  ( if . == null then null
    else
      map({ type: (.type | get_type_expr)
          , name
          , optional
          , description })
    end);

# How @throws annotations are parsed into a raw JSDoc doclet:
#
# {
#   …
#   "exceptions": [
#     { "description": "If neither `a` nor `b` is a number" }
#   ]
#   …
# }
#
# Takes a doclet and transforms `exceptions` to be
# an array of strings.
#
def get_exceptions:
  ( if . == null then null
    else
      map(.description)
    end);

def get_returns:
  ( if . == null then null
    else
      (map(.type | get_type_expr) | join("|"))
    end);

def get_exports:
  ( map(select(.access == "public" and .description != null))
  | map({(.name):  (.returns |= get_returns)
                 | (.params |= get_params)
                 | (.exceptions |= get_exceptions) })
  | add);

{ namespace: get_namespace
, exports: get_exports
}