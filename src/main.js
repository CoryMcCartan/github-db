import GitHub from "github-api";
import taffy from "../lib/taffy";

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

    let [user, repo, branch, path] = opt.db.split(":");
    let repository = gh.getRepo(user, repo);

    let db;
    try {
        let raw = await repository.getContents(branch, path);
        db = taffy(atob(raw.data.content));
    } catch(e) {
        if (!e.message.startsWith("404")) throw e;
        db = taffy();
    }

    db.save = async function() {
        let resp = await repository.writeFile(branch, path, 
                              btoa(db().stringify()), `update ${new Date()}`, { 
                                     encode: false,
                                     author: {
                                         name: user,
                                         email: `${user}@users.noreply.github.com`
                                     }
                                 }); 
        return resp.status === 200;
    };

    return db;
}

export default create;
