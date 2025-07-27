import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      consent: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Consultation Booked!",
        description: "Thank you for your interest! I'll be in touch within 24 hours to schedule your free consultation.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-champagne">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-reseda mb-6">Let's Transform Your Style</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to discover your best colors and create a wardrobe you love? Get in touch for your free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-reseda mb-8">Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-buff p-3 rounded-lg">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-reseda mb-1">Location</h4>
                  <p className="text-gray-700">Sydney, NSW, Australia</p>
                  <p className="text-gray-600 text-sm">Serving Sydney and surrounding areas</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-buff p-3 rounded-lg">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-reseda mb-1">Phone</h4>
                  <p className="text-gray-700">+61 XXX XXX XXX</p>
                  <p className="text-gray-600 text-sm">Call for immediate assistance</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-buff p-3 rounded-lg">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-reseda mb-1">Email</h4>
                  <p className="text-gray-700">hello@vividbyrathi.com</p>
                  <p className="text-gray-600 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-buff p-3 rounded-lg">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-reseda mb-1">Business Hours</h4>
                  <p className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-700">Sat: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600 text-sm">Evening and weekend appointments available</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-reseda mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <button className="bg-buff text-white p-3 rounded-lg hover:bg-sage transition-colors duration-200">
                  <Instagram size={20} />
                </button>
                <button className="bg-buff text-white p-3 rounded-lg hover:bg-sage transition-colors duration-200">
                  <Facebook size={20} />
                </button>
                <button className="bg-buff text-white p-3 rounded-lg hover:bg-sage transition-colors duration-200">
                  <Linkedin size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-reseda mb-8">Book Your Free Consultation</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={mutation.isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={mutation.isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} disabled={mutation.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} disabled={mutation.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service of Interest</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={mutation.isPending}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="color-analysis">Personal Colour Analysis</SelectItem>
                          <SelectItem value="style-consultation">Style Consultation</SelectItem>
                          <SelectItem value="wardrobe-organization">Wardrobe Organization</SelectItem>
                          <SelectItem value="personal-shopping">Personal Shopping</SelectItem>
                          <SelectItem value="virtual-consultation">Virtual Consultation</SelectItem>
                          <SelectItem value="group-workshop">Group Workshop</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell me about your style goals</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="What would you like to achieve with your style? What challenges are you facing?"
                          disabled={mutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value === "true"}
                          onCheckedChange={(checked) => field.onChange(checked ? "true" : "")}
                          disabled={mutation.isPending}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to receive communications about my consultation and style tips via email. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-buff text-white hover:bg-sage transition-all duration-200 font-semibold text-lg py-4 shadow-lg hover:shadow-xl"
                >
                  {mutation.isPending ? "Booking..." : "Book My Free Consultation"}
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  Free 20-minute consultation • No obligation • Personalized advice
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
