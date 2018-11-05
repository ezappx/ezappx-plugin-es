needBuild=false;

while getopts 'b' opt;
do
    case ${opt} in
        b) # build project
        needBuild=true;;
        ?)
            echo "Usage: `basename $0` [options]"
            exit 1
    esac
done

if $needBuild
then
    echo "compile ezappx-plugin-es..."
    npm run build
fi

echo "deploy dist/ezappx-plugin-es.min.js to cdn"
scp dist/ezappx-plugin-es.min.js ing@www.ezappx.com:~/cdn/js
echo "done"