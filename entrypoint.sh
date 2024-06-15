ENV_LOCAL_PATH=/app/.env.local

echo "Starting the application"

if test -z "${DOTENV_LOCAL}" ; then
    if ! test -f "${ENV_LOCAL_PATH}" ; then
        echo "DOTENV_LOCAL was not found in the ENV variables and .env.local is not set using a bind volume. Make sure to set environment variables properly. "
    else
        echo "DOTENV_LOCAL was not found in the ENV variables. Using .env.local file."
    fi;
else
    echo "DOTENV_LOCAL was found in the ENV variables. Creating .env.local file."
    echo "$DOTENV_LOCAL" | base64 --decode > ${ENV_LOCAL_PATH}
    # cat <<< "$DOTENV_LOCAL" > ${ENV_LOCAL_PATH}
fi;

echo "Here is the DOTENV_LOCAL"
cat ${ENV_LOCAL_PATH}

if [ "$INCLUDE_DB" = "true" ] ; then
    echo "Starting local MongoDB instance"
    nohup mongod &
fi;

export PUBLIC_VERSION=$(node -p "require('./package.json').version")

dotenv -e app/.env -e /app/.env.local -c -- node /app/build/index.js -- --host 0.0.0.0