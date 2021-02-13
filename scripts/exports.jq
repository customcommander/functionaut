def location:
  ( .meta.path + "/" + .meta.filename
  | "./" + ltrimstr("/workspace/dev/src/"));

  map(select(.namespace != null and .exports != null))
| reduce .[] as {$namespace, $exports} ({};
    ($namespace | split(".")) as $path
      | setpath($path; getpath($path) + ($exports | map_values(location))))
