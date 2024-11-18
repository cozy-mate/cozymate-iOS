#!/bin/bash

# 머지 / pull 후 빌드가 안 될 때 사용하는 스크립트입니다.

# 스크립트 시작 알림
echo "🚀 React Native 프로젝트 정리 및 빌드 자동화 시작..."

# 캐시 삭제
echo "🧹 Watchman 캐시 삭제 중..."
watchman watch-del-all

echo "🧹 Node_modules 삭제 중..."
rm -rf node_modules

echo "🧹 Yarn 캐시 삭제 중..."
yarn cache clean

echo "🧹 iOS DerivedData 삭제 중..."
rm -rf ~/Library/Developer/Xcode/DerivedData

echo "🧹 iOS Pods 캐시 삭제 중..."
cd ios
rm -rf Pods
rm -f Podfile.lock
pod deintegrate

# 의존성 재설치
echo "📦 의존성 재설치 중..."
cd ..
yarn install

echo "📦 iOS Pods 설치 중..."
cd ios
pod install --repo-update
cd ..

# 빌드 시도
echo "🔨 빌드 시도 중..."
yarn start

