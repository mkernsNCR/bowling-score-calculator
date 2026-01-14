import { createRepository, getUncachableGitHubClient } from '../server/github';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

async function pushToGitHub() {
  const repoName = 'bowling-score-calculator';
  const description = 'An interactive bowling scoring coach that teaches you how strikes, spares, and the 10th frame work through real-time calculation and step-by-step explanations.';
  
  console.log('Creating GitHub repository...');
  
  try {
    const { owner, repoUrl, cloneUrl } = await createRepository(repoName, description, false);
    console.log(`Repository created: ${repoUrl}`);
    
    const octokit = await getUncachableGitHubClient();
    const { data: user } = await octokit.users.getAuthenticated();
    
    const token = await getAccessTokenForGit();
    const authCloneUrl = cloneUrl.replace('https://', `https://${user.login}:${token}@`);
    
    console.log('Configuring git remote...');
    
    try {
      execSync('git remote remove origin', { stdio: 'pipe' });
    } catch (e) {
    }
    
    execSync(`git remote add origin ${authCloneUrl}`, { stdio: 'inherit' });
    
    console.log('Pushing code to GitHub...');
    execSync('git push -u origin main', { stdio: 'inherit' });
    
    console.log('\n✅ Success! Your project is now on GitHub:');
    console.log(`   ${repoUrl}`);
    
  } catch (error: any) {
    if (error.message?.includes('name already exists')) {
      console.error('A repository with this name already exists on your GitHub account.');
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

async function getAccessTokenForGit(): Promise<string> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  const response = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  );
  
  const data = await response.json();
  const connectionSettings = data.items?.[0];
  const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;
  
  if (!accessToken) {
    throw new Error('GitHub not connected');
  }
  
  return accessToken;
}

pushToGitHub();
