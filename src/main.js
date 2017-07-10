import GitHub from "github-api";

/**
 * Create database object.
 *
 * Options:
 *  - PAT: GitHub Personal Access Token.  Needs repository permissions.
 *  - db: Path to JSON database file. 'UserName:repo-name:master:path/to/file.json'
 */
async function create(opt) {
    let gh = new GitHub({
        token: opt.PAT,
    });

    let [user, repo, ref, path] = opt.db.split(":");
    let repository = gh.getRepo(user, repo);

    let raw = await repo.getContents(ref, path);
    let data = JSON.parse(atob(raw.data.content));

    return {
    };
}

export default {
    create,
};
