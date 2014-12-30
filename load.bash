geany `find contents/js/ -type f -name "*.js" | xargs echo -n` \
`find contents/less/ -type f -name "*.less" | xargs echo -n` \
`find contents/posts/ -type f -name "*.md" | xargs echo -n` \
`find contents/projects/ -type f -name "*.md" | xargs echo -n` \
`find contents/misc/ -type f -name "*.md" | xargs echo -n` \
`find templates/ -type f -name "*.jade" | xargs echo -n` \
`ls contents/*.json | xargs echo -n` \
`ls contents/*.md | xargs echo -n`
