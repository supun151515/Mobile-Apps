/* AUTO-GENERATED FILE. DO NOT MODIFY.
 * This class was automatically generated by the
 * static binding generator from the resources it found.
 * Please do not modify by hand.
 */
package com.tns.gen.javax.net.ssl;

public class HostnameVerifier extends java.lang.Object
    implements com.tns.NativeScriptHashCodeProvider, javax.net.ssl.HostnameVerifier {
  public HostnameVerifier() {
    super();
    com.tns.Runtime.initInstance(this);
  }

  public boolean verify(java.lang.String param_0, javax.net.ssl.SSLSession param_1) {
    java.lang.Object[] args = new java.lang.Object[2];
    args[0] = param_0;
    args[1] = param_1;
    return (boolean) com.tns.Runtime.callJSMethod(this, "verify", boolean.class, args);
  }

  public int hashCode__super() {
    return super.hashCode();
  }

  public boolean equals__super(java.lang.Object other) {
    return super.equals(other);
  }
}
