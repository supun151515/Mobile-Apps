/* AUTO-GENERATED FILE. DO NOT MODIFY.
 * This class was automatically generated by the
 * static binding generator from the resources it found.
 * Please do not modify by hand.
 */
package com.tns.gen.okhttp3;

public class Callback extends java.lang.Object
    implements com.tns.NativeScriptHashCodeProvider, okhttp3.Callback {
  public Callback() {
    super();
    com.tns.Runtime.initInstance(this);
  }

  public void onFailure(okhttp3.Call param_0, java.io.IOException param_1) {
    java.lang.Object[] args = new java.lang.Object[2];
    args[0] = param_0;
    args[1] = param_1;
    com.tns.Runtime.callJSMethod(this, "onFailure", void.class, args);
  }

  public void onResponse(okhttp3.Call param_0, okhttp3.Response param_1) {
    java.lang.Object[] args = new java.lang.Object[2];
    args[0] = param_0;
    args[1] = param_1;
    com.tns.Runtime.callJSMethod(this, "onResponse", void.class, args);
  }

  public int hashCode__super() {
    return super.hashCode();
  }

  public boolean equals__super(java.lang.Object other) {
    return super.equals(other);
  }
}
