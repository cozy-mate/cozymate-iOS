#import "RNFBMessagingModule.h"
#import "AppDelegate.h"
#import "RNSplashScreen.h"
#import <Firebase.h>
#import <React/RCTLinkingManager.h>
#import <RNCKakaoUser/RNCKakaoUserUtil.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"cozymate";
  
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];

  [FIRApp configure];

  BOOL didFinishLaunchingWithOptions = [super application:application didFinishLaunchingWithOptions:launchOptions];

  [RNSplashScreen show];

  return didFinishLaunchingWithOptions;
}


// Linking API
-  (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  // Handling logic in this app if the URL scheme is from KakaoTalk.
  if([RNCKakaoUserUtil isKakaoTalkLoginUrl:url]) {
    return [RNCKakaoUserUtil handleOpenUrl:url];
  }

  return [super application:application openURL:url options:options] || [RCTLinkingManager application:application openURL:url options:options];
}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
