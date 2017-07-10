import GitHub from "github-api";

async function main() {
    const PAT = "74b3dbcf816b1a06c1011c1868e3b4ac088a35fc";
    let gh = new GitHub({
        token: PAT,
    });

    let repo = gh.getRepo("CoryMcCartan", "github-db");
    let contents = await repo.getContents("master", "package.json");
    console.log(contents);
}

main();
