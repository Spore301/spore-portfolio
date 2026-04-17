#!/bin/bash

# Portfolio Deployment Script
# Usage: ./deploy.sh [web|cms|both]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Portfolio Deployment Script ===${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Function to deploy an app
deploy_app() {
    local app_dir=$1
    local app_name=$2

    echo -e "${GREEN}Deploying $app_name...${NC}"
    cd "$app_dir"

    # Check if already linked to Vercel
    if [ ! -d ".vercel" ]; then
        echo -e "${YELLOW}Linking $app_name to Vercel...${NC}"
        vercel link
    fi

    # Deploy
    echo -e "${YELLOW}Building and deploying...${NC}"
    vercel --prod

    echo -e "${GREEN}$app_name deployed successfully!${NC}"
    echo ""
    cd ..
}

# Function to set environment variables
setup_env() {
    local app_dir=$1
    local app_name=$2

    echo -e "${YELLOW}Setting up environment variables for $app_name...${NC}"
    cd "$app_dir"

    echo "You'll need these values from Supabase Dashboard:"
    echo "  - Project URL (NEXT_PUBLIC_SUPABASE_URL)"
    echo "  - anon public API key (NEXT_PUBLIC_SUPABASE_ANON_KEY)"
    echo "  - Gemini API key (GEMINI_API_KEY) - from Google AI Studio"
    echo ""

    read -p "Set environment variables now? (y/n): " setup_env_now
    if [ "$setup_env_now" = "y" ]; then
        vercel env add NEXT_PUBLIC_SUPABASE_URL
        vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
        vercel env add GEMINI_API_KEY

        echo -e "${GREEN}Environment variables set!${NC}"
        echo -e "${YELLOW}Redeploying to apply changes...${NC}"
        vercel --prod
    fi

    cd ..
}

# Main deployment logic
case "${1:-web}" in
    web)
        deploy_app "web" "Portfolio (web)"
        setup_env "web" "Portfolio (web)"
        echo -e "${GREEN}Deployment complete!${NC}"
        echo "Your portfolio is now live!"
        ;;
    cms)
        deploy_app "cms" "CMS (cms)"
        setup_env "cms" "CMS (cms)"
        ;;
    both)
        deploy_app "web" "Portfolio (web)"
        setup_env "web" "Portfolio (web)"
        deploy_app "cms" "CMS (cms)"
        setup_env "cms" "CMS (cms)"
        ;;
    *)
        echo "Usage: ./deploy.sh [web|cms|both]"
        echo ""
        echo "Options:"
        echo "  web   - Deploy only the portfolio website (recommended)"
        echo "  cms   - Deploy only the CMS app (legacy)"
        echo "  both  - Deploy both apps"
        echo ""
        echo "Note: The 'web' app includes /admin for content management."
        echo "      The separate 'cms' app is legacy and optional."
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}=== Deployment Summary ===${NC}"
echo "View your deployments at: https://vercel.com/dashboard"
echo "Manage your database at: https://supabase.com/dashboard"
echo ""
echo "Next steps:"
echo "  1. Visit your deployed site"
echo "  2. Test the /admin login"
echo "  3. Add a custom domain (optional)"
