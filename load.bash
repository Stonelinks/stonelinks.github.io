find contents/js/ -type f -name "*.js" -exec geany '{}' \; &
find contents/less/ -type f -name "*.less" -exec geany '{}' \; &
find contents/posts/ -type f -name "*.md" -exec geany '{}' \; &
find contents/projects/ -type f -name "*.md" -exec geany '{}' \; &
find contents/misc/ -type f -name "*.md" -exec geany '{}' \; &
find templates/ -type f -name "*.jade" -exec geany '{}' \; &
geany contents/*.json &
geany contents/*.md &
